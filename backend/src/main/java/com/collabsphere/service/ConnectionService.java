package com.collabsphere.service;

import com.collabsphere.dto.ConnectionDTO;
import com.collabsphere.dto.UserDTO;
import com.collabsphere.model.Connection;
import com.collabsphere.model.Notification;
import com.collabsphere.model.User;
import com.collabsphere.repository.ConnectionRepository;
import com.collabsphere.repository.NotificationRepository;
import com.collabsphere.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConnectionService {

    private final ConnectionRepository connectionRepository;
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;
    private final UserService userService;

    @Transactional
    public ConnectionDTO sendConnectionRequest(Long receiverId) {
        User sender = userService.getCurrentUser();
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (sender.getId().equals(receiver.getId())) {
            throw new RuntimeException("Cannot send connection request to yourself");
        }

        // Check if connection already exists
        connectionRepository.findConnectionBetweenUsers(sender, receiver)
                .ifPresent(conn -> {
                    throw new RuntimeException("Connection request already exists");
                });

        Connection connection = new Connection();
        connection.setSender(sender);
        connection.setReceiver(receiver);
        connection.setStatus(Connection.Status.PENDING);

        connection = connectionRepository.save(connection);

        // Create notification for receiver
        Notification notification = new Notification();
        notification.setUser(receiver);
        notification.setTitle("New Connection Request");
        notification.setMessage(sender.getDisplayName() + " sent you a connection request");
        notification.setType(Notification.Type.CONNECTION_REQUEST);
        notification.setActionUrl("/connections");
        notificationRepository.save(notification);

        return mapToConnectionDTO(connection);
    }

    @Transactional
    public ConnectionDTO acceptConnectionRequest(Long connectionId) {
        User currentUser = userService.getCurrentUser();
        Connection connection = connectionRepository.findById(connectionId)
                .orElseThrow(() -> new RuntimeException("Connection request not found"));

        if (!connection.getReceiver().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized to accept this connection request");
        }

        connection.setStatus(Connection.Status.ACCEPTED);
        connection.setUpdatedAt(LocalDateTime.now());
        connection = connectionRepository.save(connection);

        // Notify sender
        Notification notification = new Notification();
        notification.setUser(connection.getSender());
        notification.setTitle("Connection Request Accepted");
        notification.setMessage(currentUser.getDisplayName() + " accepted your connection request");
        notification.setType(Notification.Type.CONNECTION_ACCEPTED);
        notification.setActionUrl("/profile/" + currentUser.getId());
        notificationRepository.save(notification);

        return mapToConnectionDTO(connection);
    }

    @Transactional
    public void rejectConnectionRequest(Long connectionId) {
        User currentUser = userService.getCurrentUser();
        Connection connection = connectionRepository.findById(connectionId)
                .orElseThrow(() -> new RuntimeException("Connection request not found"));

        if (!connection.getReceiver().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized to reject this connection request");
        }

        connection.setStatus(Connection.Status.REJECTED);
        connection.setUpdatedAt(LocalDateTime.now());
        connectionRepository.save(connection);
    }

    public List<ConnectionDTO> getPendingRequests() {
        User currentUser = userService.getCurrentUser();
        return connectionRepository.findByReceiverAndStatus(currentUser, Connection.Status.PENDING)
                .stream()
                .map(this::mapToConnectionDTO)
                .collect(Collectors.toList());
    }

    public List<ConnectionDTO> getMyConnections() {
        User currentUser = userService.getCurrentUser();
        return connectionRepository.findByUserAndStatus(currentUser, Connection.Status.ACCEPTED)
                .stream()
                .map(this::mapToConnectionDTO)
                .collect(Collectors.toList());
    }

    public Long getConnectionCount() {
        User currentUser = userService.getCurrentUser();
        return connectionRepository.countUserConnections(currentUser);
    }

    public String getConnectionStatus(Long userId) {
        User currentUser = userService.getCurrentUser();
        User otherUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (currentUser.getId().equals(userId)) {
            return "SELF";
        }

        Optional<Connection> connectionOpt = connectionRepository.findConnectionBetweenUsers(currentUser, otherUser);
        
        if (connectionOpt.isEmpty()) {
            return "NONE";
        }

        Connection connection = connectionOpt.get();
        
        if (connection.getStatus() == Connection.Status.ACCEPTED) {
            return "CONNECTED";
        } else if (connection.getStatus() == Connection.Status.PENDING) {
            if (connection.getSender().getId().equals(currentUser.getId())) {
                return "PENDING_SENT";
            } else {
                return "PENDING_RECEIVED";
            }
        } else if (connection.getStatus() == Connection.Status.REJECTED) {
            return "REJECTED";
        }

        return "NONE";
    }

    @Transactional
    public void deleteConnection(Long connectionId) {
        User currentUser = userService.getCurrentUser();
        Connection connection = connectionRepository.findById(connectionId)
                .orElseThrow(() -> new RuntimeException("Connection not found"));

        if (!connection.getSender().getId().equals(currentUser.getId()) &&
            !connection.getReceiver().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized to delete this connection");
        }

        connectionRepository.delete(connection);
    }

    private ConnectionDTO mapToConnectionDTO(Connection connection) {
        return ConnectionDTO.builder()
                .id(connection.getId())
                .sender(mapToUserDTO(connection.getSender()))
                .receiver(mapToUserDTO(connection.getReceiver()))
                .status(connection.getStatus().name())
                .createdAt(connection.getCreatedAt())
                .build();
    }

    private UserDTO mapToUserDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .displayName(user.getDisplayName())
                .photoURL(user.getPhotoURL())
                .bio(user.getBio())
                .university(user.getUniversity())
                .major(user.getMajor())
                .skills(user.getSkills())
                .interests(user.getInterests())
                .build();
    }
}
