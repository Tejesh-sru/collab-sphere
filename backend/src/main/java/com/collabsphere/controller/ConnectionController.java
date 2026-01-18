package com.collabsphere.controller;

import com.collabsphere.dto.ApiResponse;
import com.collabsphere.dto.ConnectionDTO;
import com.collabsphere.service.ConnectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/connections")
@RequiredArgsConstructor
public class ConnectionController {

    private final ConnectionService connectionService;

    @PostMapping("/send/{receiverId}")
    public ResponseEntity<ApiResponse<ConnectionDTO>> sendConnectionRequest(@PathVariable Long receiverId) {
        ConnectionDTO connection = connectionService.sendConnectionRequest(receiverId);
        return ResponseEntity.ok(ApiResponse.success("Connection request sent", connection));
    }

    @PutMapping("/{connectionId}/accept")
    public ResponseEntity<ApiResponse<ConnectionDTO>> acceptConnectionRequest(@PathVariable Long connectionId) {
        ConnectionDTO connection = connectionService.acceptConnectionRequest(connectionId);
        return ResponseEntity.ok(ApiResponse.success("Connection request accepted", connection));
    }

    @PutMapping("/{connectionId}/reject")
    public ResponseEntity<ApiResponse<Void>> rejectConnectionRequest(@PathVariable Long connectionId) {
        connectionService.rejectConnectionRequest(connectionId);
        return ResponseEntity.ok(ApiResponse.success("Connection request rejected", null));
    }

    @GetMapping("/pending")
    public ResponseEntity<ApiResponse<List<ConnectionDTO>>> getPendingRequests() {
        List<ConnectionDTO> connections = connectionService.getPendingRequests();
        return ResponseEntity.ok(ApiResponse.success(connections));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<ConnectionDTO>>> getMyConnections() {
        List<ConnectionDTO> connections = connectionService.getMyConnections();
        return ResponseEntity.ok(ApiResponse.success(connections));
    }

    @GetMapping("/count")
    public ResponseEntity<ApiResponse<Long>> getConnectionCount() {
        Long count = connectionService.getConnectionCount();
        return ResponseEntity.ok(ApiResponse.success(count));
    }

    @GetMapping("/status/{userId}")
    public ResponseEntity<ApiResponse<String>> getConnectionStatus(@PathVariable Long userId) {
        String status = connectionService.getConnectionStatus(userId);
        return ResponseEntity.ok(ApiResponse.success(status));
    }

    @DeleteMapping("/{connectionId}")
    public ResponseEntity<ApiResponse<Void>> deleteConnection(@PathVariable Long connectionId) {
        connectionService.deleteConnection(connectionId);
        return ResponseEntity.ok(ApiResponse.success("Connection removed successfully", null));
    }
}
