package com.collabsphere.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageRequest {
    
    @NotBlank(message = "Receiver ID is required")
    private Long receiverId;
    
    @NotBlank(message = "Content is required")
    private String content;
}
