package com.collabsphere.controller;

import com.collabsphere.dto.ApiResponse;
import com.collabsphere.dto.ProjectDTO;
import com.collabsphere.dto.ProjectRequest;
import com.collabsphere.dto.ProjectTaskDTO;
import com.collabsphere.service.ProjectService;
import com.collabsphere.service.ProjectTaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    
    @Autowired
    private ProjectTaskService taskService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProjectDTO>> createProject(@Valid @RequestBody ProjectRequest request) {
        ProjectDTO project = projectService.createProject(request);
        return ResponseEntity.ok(ApiResponse.success("Project created successfully", project));
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<ApiResponse<ProjectDTO>> updateProject(
            @PathVariable Long projectId,
            @Valid @RequestBody ProjectRequest request) {
        ProjectDTO project = projectService.updateProject(projectId, request);
        return ResponseEntity.ok(ApiResponse.success("Project updated successfully", project));
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@PathVariable Long projectId) {
        projectService.deleteProject(projectId);
        return ResponseEntity.ok(ApiResponse.success("Project deleted successfully", null));
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ApiResponse<ProjectDTO>> getProject(@PathVariable Long projectId) {
        ProjectDTO project = projectService.getProject(projectId);
        return ResponseEntity.ok(ApiResponse.success(project));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<ProjectDTO>>> getMyProjects() {
        List<ProjectDTO> projects = projectService.getMyProjects();
        return ResponseEntity.ok(ApiResponse.success(projects));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<ProjectDTO>>> getUserProjects(@PathVariable Long userId) {
        List<ProjectDTO> projects = projectService.getUserProjects(userId);
        return ResponseEntity.ok(ApiResponse.success(projects));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<ProjectDTO>>> searchProjects(
            @RequestParam(required = false) String q) {
        List<ProjectDTO> projects = projectService.searchProjects(q);
        return ResponseEntity.ok(ApiResponse.success(projects));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<ProjectDTO>>> getAllProjects() {
        List<ProjectDTO> projects = projectService.getAllProjects();
        return ResponseEntity.ok(ApiResponse.success(projects));
    }

    @GetMapping("/filter/technology")
    public ResponseEntity<ApiResponse<List<ProjectDTO>>> getProjectsByTechnology(
            @RequestParam List<String> technologies) {
        List<ProjectDTO> projects = projectService.getProjectsByTechnology(technologies);
        return ResponseEntity.ok(ApiResponse.success(projects));
    }

    // Task Management Endpoints
    
    @PostMapping("/{projectId}/tasks")
    public ResponseEntity<ApiResponse<ProjectTaskDTO>> createTask(
            @PathVariable Long projectId,
            @RequestBody ProjectTaskDTO taskDTO) {
        ProjectTaskDTO task = taskService.createTask(projectId, taskDTO);
        return ResponseEntity.ok(ApiResponse.success("Task created successfully", task));
    }

    @GetMapping("/{projectId}/tasks")
    public ResponseEntity<ApiResponse<List<ProjectTaskDTO>>> getProjectTasks(@PathVariable Long projectId) {
        List<ProjectTaskDTO> tasks = taskService.getProjectTasks(projectId);
        return ResponseEntity.ok(ApiResponse.success(tasks));
    }

    @PutMapping("/tasks/{taskId}/status")
    public ResponseEntity<ApiResponse<ProjectTaskDTO>> updateTaskStatus(
            @PathVariable Long taskId,
            @RequestBody Map<String, String> request) {
        ProjectTaskDTO task = taskService.updateTaskStatus(taskId, request.get("status"));
        return ResponseEntity.ok(ApiResponse.success("Task status updated", task));
    }

    @DeleteMapping("/tasks/{taskId}")
    public ResponseEntity<ApiResponse<String>> deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.ok(ApiResponse.success("Task deleted successfully", "Success"));
    }
}

