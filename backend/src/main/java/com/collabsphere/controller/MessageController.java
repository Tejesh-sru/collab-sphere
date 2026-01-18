package com.collabsphere.controller;

import com.collabsphere.dto.ApiResponse;
import com.collabsphere.dto.MessageDTO;
import com.collabsphere.dto.MessageRequest;
import com.collabsphere.dto.UserDTO;
import com.collabsphere.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @PostMapping
    public ResponseEntity<ApiResponse<MessageDTO>> sendMessage(@Valid @RequestBody MessageRequest request) {
        MessageDTO message = messageService.sendMessage(request);
        return ResponseEntity.ok(ApiResponse.success("Message sent", message));
    }

    @GetMapping("/conversation/{userId}")
    public ResponseEntity<ApiResponse<List<MessageDTO>>> getConversation(@PathVariable Long userId) {
        List<MessageDTO> messages = messageService.getConversation(userId);
        return ResponseEntity.ok(ApiResponse.success(messages));
    }

    @PutMapping("/{messageId}/read")
    public ResponseEntity<ApiResponse<Void>> markAsRead(@PathVariable Long messageId) {
        messageService.markAsRead(messageId);
        return ResponseEntity.ok(ApiResponse.success("Message marked as read", null));
    }

    @GetMapping("/unread")
    public ResponseEntity<ApiResponse<List<MessageDTO>>> getUnreadMessages() {
        List<MessageDTO> messages = messageService.getUnreadMessages();
        return ResponseEntity.ok(ApiResponse.success(messages));
    }

    @GetMapping("/unread/count")
    public ResponseEntity<ApiResponse<Long>> getUnreadCount() {
        Long count = messageService.getUnreadCount();
        return ResponseEntity.ok(ApiResponse.success(count));
    }

    @GetMapping("/conversations")
    public ResponseEntity<ApiResponse<List<UserDTO>>> getConversationPartners() {
        List<UserDTO> users = messageService.getConversationPartners();
        return ResponseEntity.ok(ApiResponse.success(users));
    }

    @DeleteMapping("/{messageId}")
    public ResponseEntity<ApiResponse<Void>> deleteMessage(@PathVariable Long messageId) {
        messageService.deleteMessage(messageId);
        return ResponseEntity.ok(ApiResponse.success("Message deleted", null));
    }
}
