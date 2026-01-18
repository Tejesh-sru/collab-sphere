package com.collabsphere.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDTO {
    private Long totalProjects;
    private Long totalConnections;
    private Long unreadMessages;
    private Long pendingRequests;
    private Map<String, Long> additionalStats;
}
