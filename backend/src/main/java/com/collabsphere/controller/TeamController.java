package com.collabsphere.controller;

import com.collabsphere.dto.ApiResponse;
import com.collabsphere.dto.CreateTeamRequest;
import com.collabsphere.dto.MessageDTO;
import com.collabsphere.dto.MessageRequest;
import com.collabsphere.dto.TeamDTO;
import com.collabsphere.dto.TeamMemberDTO;
import com.collabsphere.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teams")
public class TeamController {

    @Autowired
    private TeamService teamService;

    /**
     * Create new team with auto-matching
     */
    @PostMapping("/create")
    public ResponseEntity<ApiResponse<TeamDTO>> createTeam(@RequestBody CreateTeamRequest request) {
        TeamDTO team = teamService.createTeamWithAutoMatching(request);
        return ResponseEntity.ok(ApiResponse.success("Team created successfully. Invitations sent to members.", team));
    }

    /**
     * Get team by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TeamDTO>> getTeam(@PathVariable Long id) {
        TeamDTO team = teamService.getTeamById(id);
        return ResponseEntity.ok(ApiResponse.success(team));
    }

    /**
     * Get current user's teams
     */
    @GetMapping("/my-teams")
    public ResponseEntity<ApiResponse<List<TeamDTO>>> getMyTeams() {
        List<TeamDTO> teams = teamService.getUserTeams();
        return ResponseEntity.ok(ApiResponse.success(teams));
    }

    /**
     * Get pending invitations
     */
    @GetMapping("/invitations")
    public ResponseEntity<ApiResponse<List<TeamDTO>>> getPendingInvitations() {
        List<TeamDTO> teams = teamService.getPendingInvitations();
        return ResponseEntity.ok(ApiResponse.success(teams));
    }

    /**
     * Accept team invitation
     */
    @PostMapping("/{teamId}/accept")
    public ResponseEntity<ApiResponse<TeamMemberDTO>> acceptInvitation(@PathVariable Long teamId) {
        TeamMemberDTO member = teamService.acceptInvitation(teamId);
        return ResponseEntity.ok(ApiResponse.success("Invitation accepted successfully", member));
    }

    /**
     * Reject team invitation
     */
    @PostMapping("/{teamId}/reject")
    public ResponseEntity<ApiResponse<String>> rejectInvitation(@PathVariable Long teamId) {
        teamService.rejectInvitation(teamId);
        return ResponseEntity.ok(ApiResponse.success("Invitation rejected", "Success"));
    }

    /**
     * Search students by skills
     */
    @GetMapping("/search-students")
    public ResponseEntity<ApiResponse<List<com.collabsphere.dto.UserDTO>>> searchStudents(
            @RequestParam(required = false) List<String> skills) {
        List<com.collabsphere.dto.UserDTO> students = teamService.searchStudentsBySkills(skills);
        return ResponseEntity.ok(ApiResponse.success(students));
    }

    /**
     * Send manual invitation to user
     */
    @PostMapping("/{teamId}/invite/{userId}")
    public ResponseEntity<ApiResponse<String>> sendInvitation(
            @PathVariable Long teamId, 
            @PathVariable Long userId) {
        teamService.sendManualInvitation(teamId, userId);
        return ResponseEntity.ok(ApiResponse.success("Invitation sent successfully", "Success"));
    }

    /**
     * Get team chat messages
     */
    @GetMapping("/{teamId}/messages")
    public ResponseEntity<ApiResponse<List<MessageDTO>>> getTeamMessages(@PathVariable Long teamId) {
        List<MessageDTO> messages = teamService.getTeamMessages(teamId);
        return ResponseEntity.ok(ApiResponse.success(messages));
    }

    /**
     * Send message to team
     */
    @PostMapping("/{teamId}/messages")
    public ResponseEntity<ApiResponse<MessageDTO>> sendTeamMessage(
            @PathVariable Long teamId,
            @RequestBody MessageRequest request) {
        MessageDTO message = teamService.sendTeamMessage(teamId, request.getContent());
        return ResponseEntity.ok(ApiResponse.success("Message sent", message));
    }
}
