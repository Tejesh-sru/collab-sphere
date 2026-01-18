package com.collabsphere.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProfileRequest {
    private String displayName;
    private String bio;
    private String university;
    private String major;
    private String year;
    private String location;
    private String githubUrl;
    private String linkedinUrl;
    private String twitterUrl;
    private Set<String> skills;
    private Set<String> interests;
}
