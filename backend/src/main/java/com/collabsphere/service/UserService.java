package com.collabsphere.service;

import com.collabsphere.dto.ChangePasswordRequest;
import com.collabsphere.dto.UpdateProfileRequest;
import com.collabsphere.dto.UserDTO;
import com.collabsphere.model.User;
import com.collabsphere.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserDTO getProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToUserDTO(user);
    }

    public UserDTO getCurrentUserProfile() {
        User user = getCurrentUser();
        return mapToUserDTO(user);
    }

    public UserDTO updateProfile(UpdateProfileRequest request) {
        User user = getCurrentUser();

        if (request.getDisplayName() != null) user.setDisplayName(request.getDisplayName());
        if (request.getBio() != null) user.setBio(request.getBio());
        if (request.getUniversity() != null) user.setUniversity(request.getUniversity());
        if (request.getMajor() != null) user.setMajor(request.getMajor());
        if (request.getYear() != null) user.setYear(request.getYear());
        if (request.getLocation() != null) user.setLocation(request.getLocation());
        if (request.getGithubUrl() != null) user.setGithubUrl(request.getGithubUrl());
        if (request.getLinkedinUrl() != null) user.setLinkedinUrl(request.getLinkedinUrl());
        if (request.getTwitterUrl() != null) user.setTwitterUrl(request.getTwitterUrl());
        if (request.getSkills() != null) user.setSkills(request.getSkills());
        if (request.getInterests() != null) user.setInterests(request.getInterests());

        user = userRepository.save(user);
        return mapToUserDTO(user);
    }

    public List<UserDTO> searchUsers(String search) {
        List<User> users;
        if (search == null || search.trim().isEmpty()) {
            users = userRepository.findByIsActiveTrue();
        } else {
            users = userRepository.searchUsers(search);
        }
        return users.stream()
                .map(this::mapToUserDTO)
                .collect(Collectors.toList());
    }

    public List<UserDTO> getUsersBySkills(List<String> skills) {
        return userRepository.findBySkills(skills).stream()
                .map(this::mapToUserDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteCurrentUser() {
        User user = getCurrentUser();
        user.setIsActive(false);
        userRepository.save(user);
    }

    @Transactional
    public void changePassword(ChangePasswordRequest request) {
        User user = getCurrentUser();

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    public UserDTO mapToUserDTO(User user) {
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
