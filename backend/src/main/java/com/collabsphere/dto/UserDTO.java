package com.collabsphere.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String email;
    private String displayName;
    private String photoURL;
    private String bio;
    private String university;
    private String major;
    private String year;
    private String location;
    private String githubUrl;
    private String linkedinUrl;
    private String twitterUrl;
    private Boolean emailVerified;
    private Set<String> skills;
    private Set<String> interests;
    private String role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
