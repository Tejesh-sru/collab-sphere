package com.collabsphere.service;

import com.collabsphere.dto.MessageDTO;
import com.collabsphere.dto.MessageRequest;
import com.collabsphere.dto.UserDTO;
import com.collabsphere.model.Message;
import com.collabsphere.model.Notification;
import com.collabsphere.model.User;
import com.collabsphere.repository.MessageRepository;
import com.collabsphere.repository.NotificationRepository;
import com.collabsphere.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;
    private final UserService userService;

    @Transactional
    public MessageDTO sendMessage(MessageRequest request) {
        User sender = userService.getCurrentUser();
        User receiver = userRepository.findById(request.getReceiverId())
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        Message message = new Message();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(request.getContent());
        message.setIsRead(false);

        message = messageRepository.save(message);

        // Create notification
        Notification notification = new Notification();
        notification.setUser(receiver);
        notification.setTitle("New Message");
        notification.setMessage(sender.getDisplayName() + " sent you a message");
        notification.setType(Notification.Type.MESSAGE_RECEIVED);
        notification.setActionUrl("/messages");
        notificationRepository.save(notification);

        return mapToMessageDTO(message);
    }

    public List<MessageDTO> getConversation(Long userId) {
        User currentUser = userService.getCurrentUser();
        User otherUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return messageRepository.findConversation(currentUser, otherUser)
                .stream()
                .map(this::mapToMessageDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void markAsRead(Long messageId) {
        User currentUser = userService.getCurrentUser();
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));

        if (!message.getReceiver().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        message.setIsRead(true);
        messageRepository.save(message);
    }

    public List<MessageDTO> getUnreadMessages() {
        User currentUser = userService.getCurrentUser();
        return messageRepository.findByReceiverAndIsReadFalseOrderByCreatedAtDesc(currentUser)
                .stream()
                .map(this::mapToMessageDTO)
                .collect(Collectors.toList());
    }

    public Long getUnreadCount() {
        User currentUser = userService.getCurrentUser();
        return messageRepository.countUnreadMessages(currentUser);
    }

    public List<UserDTO> getConversationPartners() {
        User currentUser = userService.getCurrentUser();
        return messageRepository.findConversationPartners(currentUser)
                .stream()
                .map(this::mapToUserDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteMessage(Long messageId) {
        User currentUser = userService.getCurrentUser();
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));

        if (!message.getSender().getId().equals(currentUser.getId()) &&
            !message.getReceiver().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized to delete this message");
        }

        messageRepository.delete(message);
    }

    private MessageDTO mapToMessageDTO(Message message) {
        return MessageDTO.builder()
                .id(message.getId())
                .sender(mapToUserDTO(message.getSender()))
                .receiver(mapToUserDTO(message.getReceiver()))
                .content(message.getContent())
                .isRead(message.getIsRead())
                .createdAt(message.getCreatedAt())
                .build();
    }

    private UserDTO mapToUserDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .displayName(user.getDisplayName())
                .photoURL(user.getPhotoURL())
                .build();
    }
}
