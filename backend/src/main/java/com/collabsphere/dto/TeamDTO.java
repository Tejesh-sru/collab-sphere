package com.collabsphere.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamDTO {
    private Long id;
    private String name;
    private String description;
    private UserDTO leader;
    private UserDTO mentor;
    private List<TeamMemberDTO> members;
    private Set<String> requiredSkills;
    private String status;
    private Integer maxMembers;
    private ProjectDTO project;
    private LocalDateTime createdAt;
}
