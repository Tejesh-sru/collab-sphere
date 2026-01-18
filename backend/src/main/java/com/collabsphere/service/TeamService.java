package com.collabsphere.service;

import com.collabsphere.dto.*;
import com.collabsphere.model.*;
import com.collabsphere.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private TeamMemberRepository teamMemberRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    /**
     * Create a new team and automatically find best-fit members and mentor
     */
    @Transactional
    public TeamDTO createTeamWithAutoMatching(CreateTeamRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User leader = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create team
        Team team = new Team();
        team.setName(request.getName());
        team.setDescription(request.getDescription());
        team.setLeader(leader);
        team.setRequiredSkills(request.getRequiredSkills());
        team.setMaxMembers(request.getMaxMembers());
        team.setStatus(Team.TeamStatus.FORMING);
        team = teamRepository.save(team);

        // Add leader as first member
        TeamMember leaderMember = new TeamMember();
        leaderMember.setTeam(team);
        leaderMember.setUser(leader);
        leaderMember.setRole(TeamMember.MemberRole.LEADER);
        leaderMember.setStatus(TeamMember.MemberStatus.ACCEPTED);
        leaderMember.setJoinedAt(LocalDateTime.now());
        teamMemberRepository.save(leaderMember);

        // Find and invite best-fit members
        List<User> potentialMembers = findBestFitMembers(team, request.getMaxMembers() - 1);
        for (User member : potentialMembers) {
            TeamMember teamMember = new TeamMember();
            teamMember.setTeam(team);
            teamMember.setUser(member);
            teamMember.setRole(TeamMember.MemberRole.MEMBER);
            teamMember.setStatus(TeamMember.MemberStatus.PENDING);
            teamMemberRepository.save(teamMember);
            
            // Create notification for invited member
            Notification notification = new Notification();
            notification.setUser(member);
            notification.setTitle("Team Invitation");
            notification.setMessage(leader.getName() + " invited you to join team \"" + team.getName() + "\"");
            notification.setType(Notification.Type.TEAM_INVITATION);
            notification.setActionUrl("/teams");
            notification.setRead(false);
            notificationRepository.save(notification);
        }

        // Find and assign mentor
        User mentor = findBestFitMentor(request.getRequiredSkills());
        if (mentor != null) {
            team.setMentor(mentor);
            TeamMember mentorMember = new TeamMember();
            mentorMember.setTeam(team);
            mentorMember.setUser(mentor);
            mentorMember.setRole(TeamMember.MemberRole.MENTOR);
            mentorMember.setStatus(TeamMember.MemberStatus.PENDING);
            teamMemberRepository.save(mentorMember);
            
            // Create notification for mentor
            Notification notification = new Notification();
            notification.setUser(mentor);
            notification.setTitle("Mentor Invitation");
            notification.setMessage(leader.getName() + " invited you as a mentor for team \"" + team.getName() + "\"");
            notification.setType(Notification.Type.TEAM_INVITATION);
            notification.setActionUrl("/teams");
            notification.setRead(false);
            notificationRepository.save(notification);
            teamRepository.save(team);
        }

        return mapToTeamDTO(team);
    }

    /**
     * Find best-fit members based on skills
     */
    private List<User> findBestFitMembers(Team team, int count) {
        List<User> allUsers = userRepository.findAll();
        Set<String> requiredSkills = team.getRequiredSkills();

        // Score users based on skill match
        Map<User, Integer> userScores = new HashMap<>();
        for (User user : allUsers) {
            if (user.getId().equals(team.getLeader().getId())) continue;
            
            int score = 0;
            if (user.getSkills() != null) {
                for (String skill : user.getSkills()) {
                    if (requiredSkills.contains(skill)) {
                        score++;
                    }
                }
            }
            if (score > 0) {
                userScores.put(user, score);
            }
        }

        // Return top-scored users
        return userScores.entrySet().stream()
                .sorted(Map.Entry.<User, Integer>comparingByValue().reversed())
                .limit(count)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }

    /**
     * Find best-fit mentor based on skills
     */
    private User findBestFitMentor(Set<String> requiredSkills) {
        // In a real system, you'd have a way to identify mentors
        // For now, find users with most matching skills
        List<User> allUsers = userRepository.findAll();
        
        return allUsers.stream()
                .filter(user -> user.getSkills() != null && !user.getSkills().isEmpty())
                .max(Comparator.comparingInt(user -> {
                    int score = 0;
                    for (String skill : user.getSkills()) {
                        if (requiredSkills.contains(skill)) {
                            score++;
                        }
                    }
                    return score;
                }))
                .orElse(null);
    }

    /**
     * Accept team invitation
     */
    @Transactional
    public TeamMemberDTO acceptInvitation(Long teamId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        TeamMember member = teamMemberRepository.findByTeamIdAndUserId(teamId, user.getId())
                .orElseThrow(() -> new RuntimeException("Team invitation not found"));

        member.setStatus(TeamMember.MemberStatus.ACCEPTED);
        member.setJoinedAt(LocalDateTime.now());
        member = teamMemberRepository.save(member);
        
        // Create notification for team leader
        Team team = member.getTeam();
        Notification notification = new Notification();
        notification.setUser(team.getLeader());
        notification.setTitle("Team Member Joined");
        notification.setMessage(user.getName() + " accepted your invitation to join \"" + team.getName() + "\"");
        notification.setType(Notification.Type.TEAM_ACCEPTED);
        notification.setActionUrl("/teams/" + teamId);
        notification.setRead(false);
        notificationRepository.save(notification);

        // Check if all members accepted
        checkAndUpdateTeamStatus(teamId);

        return mapToTeamMemberDTO(member);
    }

    /**
     * Reject team invitation
     */
    @Transactional
    public void rejectInvitation(Long teamId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        TeamMember member = teamMemberRepository.findByTeamIdAndUserId(teamId, user.getId())
                .orElseThrow(() -> new RuntimeException("Team invitation not found"));

        member.setStatus(TeamMember.MemberStatus.REJECTED);
        teamMemberRepository.save(member);
    }

    /**
     * Check if all members accepted and update team status
     */
    private void checkAndUpdateTeamStatus(Long teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        long totalMembers = teamMemberRepository.countByTeamIdAndStatus(teamId, TeamMember.MemberStatus.ACCEPTED);
        long pendingMembers = teamMemberRepository.countByTeamIdAndStatus(teamId, TeamMember.MemberStatus.PENDING);

        // If all members accepted and we have enough members, mark as READY and assign project
        if (pendingMembers == 0 && totalMembers >= 3) {
            team.setStatus(Team.TeamStatus.READY);
            teamRepository.save(team);
            
            // Automatically assign project based on skills
            assignProjectToTeam(team);
        }
    }

    /**
     * Assign real-world project based on team skills
     */
    @Transactional
    public void assignProjectToTeam(Team team) {
        // Get a suitable project based on team skills
        Project project = generateProjectForTeam(team);
        project.setTeam(team);
        projectRepository.save(project);

        // Update team status to ACTIVE
        team.setStatus(Team.TeamStatus.ACTIVE);
        teamRepository.save(team);
        
        // Notify all team members about project assignment
        List<TeamMember> members = teamMemberRepository.findByTeamId(team.getId());
        for (TeamMember member : members) {
            Notification notification = new Notification();
            notification.setUser(member.getUser());
            notification.setTitle("Project Assigned");
            notification.setMessage("Your team \"" + team.getName() + "\" has been assigned a new project: " + project.getTitle());
            notification.setType(Notification.Type.PROJECT_ASSIGNED);
            notification.setActionUrl("/projects/" + project.getId());
            notification.setRead(false);
            notificationRepository.save(notification);
        }
    }

    /**
     * Generate project based on team skills
     */
    private Project generateProjectForTeam(Team team) {
        Set<String> skills = team.getRequiredSkills();
        Project project = new Project();
        
        // Select project based on skills
        if (skills.contains("React") || skills.contains("JavaScript") || skills.contains("Node.js")) {
            project.setTitle("Full-Stack E-Commerce Platform");
            project.setDescription("Build a complete e-commerce platform with React frontend, Node.js backend, and payment integration.");
            project.setRequirements("User authentication, Product catalog, Shopping cart, Payment gateway integration, Order management");
            project.setObjectives("Learn full-stack development, Master React and Node.js, Implement secure payment systems, Deploy to production");
            project.getTechnologies().addAll(Set.of("React", "Node.js", "Express", "MongoDB", "Stripe"));
            project.setDifficulty(Project.ProjectDifficulty.INTERMEDIATE);
            project.setEstimatedDurationWeeks(8);
        } else if (skills.contains("Python") || skills.contains("Machine Learning") || skills.contains("Data Science")) {
            project.setTitle("AI-Powered Recommendation System");
            project.setDescription("Develop a machine learning-based recommendation engine for personalized content suggestions.");
            project.setRequirements("Data collection and preprocessing, ML model development, API creation, Performance optimization");
            project.setObjectives("Master machine learning algorithms, Work with real-world datasets, Build scalable ML systems, Deploy ML models");
            project.getTechnologies().addAll(Set.of("Python", "TensorFlow", "Scikit-learn", "Flask", "PostgreSQL"));
            project.setDifficulty(Project.ProjectDifficulty.ADVANCED);
            project.setEstimatedDurationWeeks(10);
        } else if (skills.contains("Mobile Dev") || skills.contains("React Native")) {
            project.setTitle("Cross-Platform Social Media App");
            project.setDescription("Create a social networking mobile application with real-time messaging and media sharing.");
            project.setRequirements("User profiles, Real-time chat, Media upload, Push notifications, Social features");
            project.setObjectives("Learn mobile development, Master React Native, Implement real-time features, Publish to app stores");
            project.getTechnologies().addAll(Set.of("React Native", "Firebase", "Redux", "Socket.io"));
            project.setDifficulty(Project.ProjectDifficulty.INTERMEDIATE);
            project.setEstimatedDurationWeeks(9);
        } else {
            // Default project
            project.setTitle("Collaborative Task Management System");
            project.setDescription("Build a comprehensive project management tool with team collaboration features.");
            project.setRequirements("Task boards, Team collaboration, File sharing, Time tracking, Reporting");
            project.setObjectives("Learn full-stack development, Master collaboration tools, Implement real-time updates");
            project.getTechnologies().addAll(Set.of("React", "Spring Boot", "MySQL", "WebSocket"));
            project.setDifficulty(Project.ProjectDifficulty.INTERMEDIATE);
            project.setEstimatedDurationWeeks(8);
        }
        
        project.setUser(team.getLeader());
        project.setStatus(Project.ProjectStatus.NOT_STARTED);
        project.setProgressPercentage(0);
        
        return project;
    }

    /**
     * Get team by ID
     */
    public TeamDTO getTeamById(Long id) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Team not found"));
        return mapToTeamDTO(team);
    }

    /**
     * Get user's teams
     */
    public List<TeamDTO> getUserTeams() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Team> teams = teamRepository.findTeamsByMemberId(user.getId());
        teams.addAll(teamRepository.findByLeaderId(user.getId()));
        
        return teams.stream()
                .distinct()
                .map(this::mapToTeamDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get pending invitations for current user
     */
    public List<TeamDTO> getPendingInvitations() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<TeamMember> pendingMembers = teamMemberRepository
                .findByUserIdAndStatus(user.getId(), TeamMember.MemberStatus.PENDING);

        return pendingMembers.stream()
                .map(member -> mapToTeamDTO(member.getTeam()))
                .collect(Collectors.toList());
    }

    /**
     * Search students by skills for manual team formation
     */
    public List<UserDTO> searchStudentsBySkills(List<String> skills) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<User> allUsers = userRepository.findAll();
        
        // If no skills provided, return all students (excluding current user)
        if (skills == null || skills.isEmpty()) {
            return allUsers.stream()
                    .filter(user -> !user.getId().equals(currentUser.getId()))
                    .map(userService::mapToUserDTO)
                    .collect(Collectors.toList());
        }

        // Score and rank students by skill match
        Map<User, Integer> userScores = new HashMap<>();
        for (User user : allUsers) {
            if (user.getId().equals(currentUser.getId())) continue;

            int score = 0;
            Set<String> userSkills = user.getSkills();
            if (userSkills != null) {
                for (String skill : skills) {
                    if (userSkills.stream().anyMatch(s -> s.equalsIgnoreCase(skill))) {
                        score++;
                    }
                }
            }
            if (score > 0) {
                userScores.put(user, score);
            }
        }

        // Sort by score descending
        return userScores.entrySet().stream()
                .sorted(Map.Entry.<User, Integer>comparingByValue().reversed())
                .map(Map.Entry::getKey)
                .map(userService::mapToUserDTO)
                .collect(Collectors.toList());
    }

    /**
     * Send manual invitation to a user
     */
    @Transactional
    public void sendManualInvitation(Long teamId, Long userId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        // Verify current user is team leader
        if (!team.getLeader().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Only team leader can send invitations");
        }

        User invitedUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if user already invited or is member
        Optional<TeamMember> existing = teamMemberRepository.findByTeamIdAndUserId(teamId, userId);
        if (existing.isPresent()) {
            throw new RuntimeException("User already invited or is a member");
        }

        // Check if team is full
        long currentMemberCount = teamMemberRepository.countByTeamIdAndStatus(teamId, TeamMember.MemberStatus.ACCEPTED);
        if (currentMemberCount >= team.getMaxMembers()) {
            throw new RuntimeException("Team is full");
        }

        // Create invitation
        TeamMember teamMember = new TeamMember();
        teamMember.setTeam(team);
        teamMember.setUser(invitedUser);
        teamMember.setRole(TeamMember.MemberRole.MEMBER);
        teamMember.setStatus(TeamMember.MemberStatus.PENDING);
        teamMemberRepository.save(teamMember);
        
        // Create notification for invited user
        Notification notification = new Notification();
        notification.setUser(invitedUser);
        notification.setTitle("Team Invitation");
        notification.setMessage(currentUser.getName() + " invited you to join team \"" + team.getName() + "\"");
        notification.setType(Notification.Type.TEAM_INVITATION);
        notification.setActionUrl("/teams");
        notification.setRead(false);
        notificationRepository.save(notification);
    }

    /**
     * Get team chat messages
     */
    public List<MessageDTO> getTeamMessages(Long teamId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        // Verify user is a member of the team
        Optional<TeamMember> membership = teamMemberRepository.findByTeamIdAndUserId(teamId, currentUser.getId());
        if (!membership.isPresent() || membership.get().getStatus() != TeamMember.MemberStatus.ACCEPTED) {
            throw new RuntimeException("You are not a member of this team");
        }

        // For team messages, we'll use a special recipient ID format: "team_<teamId>"
        // This is a workaround. In a real app, you'd have a separate TeamMessage entity
        // For now, return an empty list and messages will be stored locally on frontend
        // Or we could fetch all messages between team members
        
        // Get all team members
        List<TeamMember> members = teamMemberRepository.findByTeamIdAndStatus(teamId, TeamMember.MemberStatus.ACCEPTED);
        Set<Long> memberIds = members.stream()
                .map(m -> m.getUser().getId())
                .collect(Collectors.toSet());

        // Get all messages between team members (simplified approach)
        List<Message> messages = messageRepository.findAll().stream()
                .filter(m -> memberIds.contains(m.getSender().getId()) && 
                            memberIds.contains(m.getReceiver().getId()))
                .sorted(Comparator.comparing(Message::getCreatedAt))
                .collect(Collectors.toList());

        return messages.stream()
                .map(this::mapToMessageDTO)
                .collect(Collectors.toList());
    }

    /**
     * Send message to team (broadcast to all members)
     */
    @Transactional
    public MessageDTO sendTeamMessage(Long teamId, String content) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        // Verify user is a member of the team
        Optional<TeamMember> membership = teamMemberRepository.findByTeamIdAndUserId(teamId, currentUser.getId());
        if (!membership.isPresent() || membership.get().getStatus() != TeamMember.MemberStatus.ACCEPTED) {
            throw new RuntimeException("You are not a member of this team");
        }

        // Create a message with a special format indicating it's a team message
        // For simplicity, we'll send to the team leader (in a real app, use a TeamMessage entity)
        Message message = new Message();
        message.setSender(currentUser);
        message.setReceiver(team.getLeader()); // Simplified: use leader as recipient
        message.setContent("[TEAM:" + teamId + "] " + content); // Tag it as team message
        message.setIsRead(false);
        message = messageRepository.save(message);

        return mapToMessageDTO(message);
    }

    /**
     * Map Message to MessageDTO
     */
    private MessageDTO mapToMessageDTO(Message message) {
        MessageDTO dto = new MessageDTO();
        dto.setId(message.getId());
        dto.setSender(userService.mapToUserDTO(message.getSender()));
        dto.setReceiver(userService.mapToUserDTO(message.getReceiver()));
        dto.setContent(message.getContent());
        dto.setIsRead(message.getIsRead());
        dto.setCreatedAt(message.getCreatedAt());
        return dto;
    }

    /**
     * Map Team to TeamDTO
     */
    private TeamDTO mapToTeamDTO(Team team) {
        TeamDTO dto = new TeamDTO();
        dto.setId(team.getId());
        dto.setName(team.getName());
        dto.setDescription(team.getDescription());
        dto.setLeader(userService.mapToUserDTO(team.getLeader()));
        if (team.getMentor() != null) {
            dto.setMentor(userService.mapToUserDTO(team.getMentor()));
        }
        dto.setRequiredSkills(team.getRequiredSkills());
        dto.setStatus(team.getStatus().name());
        dto.setMaxMembers(team.getMaxMembers());
        dto.setCreatedAt(team.getCreatedAt());

        // Include project if exists
        projectRepository.findByTeam(team).ifPresent(project -> {
            dto.setProject(projectService.mapToProjectDTO(project));
        });

        List<TeamMember> members = teamMemberRepository.findByTeamId(team.getId());
        dto.setMembers(members.stream()
                .map(this::mapToTeamMemberDTO)
                .collect(Collectors.toList()));

        return dto;
    }

    /**
     * Map TeamMember to TeamMemberDTO
     */
    private TeamMemberDTO mapToTeamMemberDTO(TeamMember member) {
        TeamMemberDTO dto = new TeamMemberDTO();
        dto.setId(member.getId());
        dto.setUser(userService.mapToUserDTO(member.getUser()));
        dto.setRole(member.getRole().name());
        dto.setStatus(member.getStatus().name());
        dto.setInvitedAt(member.getInvitedAt());
        dto.setJoinedAt(member.getJoinedAt());
        return dto;
    }
}
