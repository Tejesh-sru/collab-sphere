package com.collabsphere.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectTaskDTO {
    private Long id;
    private String title;
    private String description;
    private UserDTO assignedTo;
    private String status;
    private String priority;
    private Integer orderIndex;
    private LocalDateTime dueDate;
    private LocalDateTime completedAt;
}
