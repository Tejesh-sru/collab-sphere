package com.collabsphere.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamMemberDTO {
    private Long id;
    private UserDTO user;
    private String role;
    private String status;
    private LocalDateTime invitedAt;
    private LocalDateTime joinedAt;
}
