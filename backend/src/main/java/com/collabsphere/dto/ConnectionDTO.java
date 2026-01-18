package com.collabsphere.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConnectionDTO {
    private Long id;
    private UserDTO sender;
    private UserDTO receiver;
    private String status;
    private LocalDateTime createdAt;
}
