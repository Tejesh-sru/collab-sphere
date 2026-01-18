package com.collabsphere.controller;

import com.collabsphere.dto.ActivityDTO;
import com.collabsphere.dto.ApiResponse;
import com.collabsphere.dto.DashboardStatsDTO;
import com.collabsphere.dto.UserDTO;
import com.collabsphere.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardStatsDTO>> getDashboardStats() {
        DashboardStatsDTO stats = dashboardService.getDashboardStats();
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @GetMapping("/activities")
    public ResponseEntity<ApiResponse<List<ActivityDTO>>> getRecentActivities(
            @RequestParam(defaultValue = "10") int limit) {
        List<ActivityDTO> activities = dashboardService.getRecentActivities(limit);
        return ResponseEntity.ok(ApiResponse.success(activities));
    }

    @GetMapping("/suggestions")
    public ResponseEntity<ApiResponse<List<UserDTO>>> getSuggestedConnections(
            @RequestParam(defaultValue = "6") int limit) {
        List<UserDTO> suggestions = dashboardService.getSuggestedConnections(limit);
        return ResponseEntity.ok(ApiResponse.success(suggestions));
    }
}
