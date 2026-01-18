package com.collabsphere.controller;

import com.collabsphere.dto.ApiResponse;
import com.collabsphere.dto.ChangePasswordRequest;
import com.collabsphere.dto.UpdateProfileRequest;
import com.collabsphere.dto.UserDTO;
import com.collabsphere.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDTO>> getCurrentUser() {
        UserDTO user = userService.getCurrentUserProfile();
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserDTO>> getUserProfile(@PathVariable Long userId) {
        UserDTO user = userService.getProfile(userId);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    @PutMapping("/me")
    public ResponseEntity<ApiResponse<UserDTO>> updateProfile(@RequestBody UpdateProfileRequest request) {
        UserDTO user = userService.updateProfile(request);
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", user));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<UserDTO>>> searchUsers(
            @RequestParam(required = false) String q) {
        List<UserDTO> users = userService.searchUsers(q);
        return ResponseEntity.ok(ApiResponse.success(users));
    }

    @GetMapping("/filter/skills")
    public ResponseEntity<ApiResponse<List<UserDTO>>> getUsersBySkills(
            @RequestParam List<String> skills) {
        List<UserDTO> users = userService.getUsersBySkills(skills);
        return ResponseEntity.ok(ApiResponse.success(users));
    }

    @DeleteMapping("/me")
    public ResponseEntity<ApiResponse<Void>> deleteAccount() {
        userService.deleteCurrentUser();
        return ResponseEntity.ok(ApiResponse.success("Account deleted successfully", null));
    }

    @PostMapping("/me/password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @RequestBody ChangePasswordRequest request) {
        userService.changePassword(request);
        return ResponseEntity.ok(ApiResponse.success("Password changed successfully", null));
    }
}
