package com.collabsphere.service;

import com.collabsphere.dto.ActivityDTO;
import com.collabsphere.dto.DashboardStatsDTO;
import com.collabsphere.dto.UserDTO;
import com.collabsphere.model.Connection;
import com.collabsphere.model.User;
import com.collabsphere.repository.ConnectionRepository;
import com.collabsphere.repository.MessageRepository;
import com.collabsphere.repository.NotificationRepository;
import com.collabsphere.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ProjectRepository projectRepository;
    private final ConnectionRepository connectionRepository;
    private final MessageRepository messageRepository;
    private final NotificationRepository notificationRepository;
    private final UserService userService;

    public DashboardStatsDTO getDashboardStats() {
        User currentUser = userService.getCurrentUser();

        Long totalProjects = (long) projectRepository.findByUserOrderByCreatedAtDesc(currentUser).size();
        Long totalConnections = connectionRepository.countUserConnections(currentUser);
        Long unreadMessages = messageRepository.countUnreadMessages(currentUser);
        Long pendingRequests = (long) connectionRepository
                .findByReceiverAndStatus(currentUser, Connection.Status.PENDING).size();

        Map<String, Long> additionalStats = new HashMap<>();
        additionalStats.put("totalSkills", (long) currentUser.getSkills().size());
        additionalStats.put("totalInterests", (long) currentUser.getInterests().size());

        return DashboardStatsDTO.builder()
                .totalProjects(totalProjects)
                .totalConnections(totalConnections)
                .unreadMessages(unreadMessages)
                .pendingRequests(pendingRequests)
                .additionalStats(additionalStats)
                .build();
    }

    public List<ActivityDTO> getRecentActivities(int limit) {
        User currentUser = userService.getCurrentUser();
        List<ActivityDTO> activities = new ArrayList<>();

        // Get recent connection activities
        connectionRepository.findByUserAndStatus(currentUser, Connection.Status.ACCEPTED)
                .stream()
                .limit(limit / 2)
                .forEach(conn -> {
                    User otherUser = conn.getSender().getId().equals(currentUser.getId()) 
                            ? conn.getReceiver() : conn.getSender();
                    activities.add(ActivityDTO.builder()
                            .id(conn.getId())
                            .type("CONNECTION")
                            .description("Connected with " + otherUser.getDisplayName())
                            .user(mapToUserDTO(otherUser))
                            .timestamp(conn.getCreatedAt())
                            .actionUrl("/profile/" + otherUser.getId())
                            .build());
                });

        // Get recent projects
        projectRepository.findByUserOrderByCreatedAtDesc(currentUser)
                .stream()
                .limit(limit / 2)
                .forEach(project -> {
                    activities.add(ActivityDTO.builder()
                            .id(project.getId())
                            .type("PROJECT")
                            .description("Created project: " + project.getTitle())
                            .user(mapToUserDTO(currentUser))
                            .timestamp(project.getCreatedAt())
                            .actionUrl("/projects/" + project.getId())
                            .build());
                });

        // Sort by timestamp descending
        activities.sort((a, b) -> b.getTimestamp().compareTo(a.getTimestamp()));

        return activities.stream().limit(limit).toList();
    }

    public List<UserDTO> getSuggestedConnections(int limit) {
        User currentUser = userService.getCurrentUser();
        
        // Find users with similar skills/interests who are not already connected
        List<User> allUsers = userService.searchUsers("").stream()
                .map(dto -> {
                    User u = new User();
                    u.setId(dto.getId());
                    u.setEmail(dto.getEmail());
                    u.setDisplayName(dto.getDisplayName());
                    u.setPhotoURL(dto.getPhotoURL());
                    u.setBio(dto.getBio());
                    u.setUniversity(dto.getUniversity());
                    u.setMajor(dto.getMajor());
                    u.setSkills(dto.getSkills());
                    u.setInterests(dto.getInterests());
                    return u;
                })
                .filter(u -> !u.getId().equals(currentUser.getId()))
                .filter(u -> {
                    // Check if not already connected
                    return connectionRepository.findConnectionBetweenUsers(currentUser, u).isEmpty();
                })
                .limit(limit)
                .toList();

        return allUsers.stream()
                .map(this::mapToUserDTO)
                .toList();
    }

    private UserDTO mapToUserDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .displayName(user.getDisplayName())
                .photoURL(user.getPhotoURL())
                .bio(user.getBio())
                .university(user.getUniversity())
                .major(user.getMajor())
                .year(user.getYear())
                .location(user.getLocation())
                .githubUrl(user.getGithubUrl())
                .linkedinUrl(user.getLinkedinUrl())
                .twitterUrl(user.getTwitterUrl())
                .emailVerified(user.getEmailVerified())
                .skills(user.getSkills())
                .interests(user.getInterests())
                .role(user.getRole().name())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}
