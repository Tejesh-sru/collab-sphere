package com.collabsphere.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateTeamRequest {
    private String name;
    private String description;
    private Set<String> requiredSkills;
    private Integer maxMembers = 5;
}
