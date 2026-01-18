package com.collabsphere.service;

import com.collabsphere.dto.ProjectTaskDTO;
import com.collabsphere.dto.UserDTO;
import com.collabsphere.model.Project;
import com.collabsphere.model.ProjectTask;
import com.collabsphere.model.User;
import com.collabsphere.repository.ProjectRepository;
import com.collabsphere.repository.ProjectTaskRepository;
import com.collabsphere.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectTaskService {

    @Autowired
    private ProjectTaskRepository taskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    /**
     * Create a new task
     */
    @Transactional
    public ProjectTaskDTO createTask(Long projectId, ProjectTaskDTO taskDTO) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        ProjectTask task = new ProjectTask();
        task.setProject(project);
        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setStatus(ProjectTask.TaskStatus.TODO);
        task.setPriority(ProjectTask.TaskPriority.valueOf(taskDTO.getPriority() != null ? taskDTO.getPriority() : "MEDIUM"));
        task.setOrderIndex(taskDTO.getOrderIndex() != null ? taskDTO.getOrderIndex() : 0);
        
        if (taskDTO.getAssignedTo() != null && taskDTO.getAssignedTo().getId() != null) {
            User assignee = userRepository.findById(taskDTO.getAssignedTo().getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            task.setAssignedTo(assignee);
        }

        task = taskRepository.save(task);
        updateProjectProgress(projectId);
        return mapToTaskDTO(task);
    }

    /**
     * Update task status
     */
    @Transactional
    public ProjectTaskDTO updateTaskStatus(Long taskId, String status) {
        ProjectTask task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(ProjectTask.TaskStatus.valueOf(status));
        
        if (status.equals("COMPLETED")) {
            task.setCompletedAt(LocalDateTime.now());
        }

        task = taskRepository.save(task);
        updateProjectProgress(task.getProject().getId());
        return mapToTaskDTO(task);
    }

    /**
     * Get tasks for a project
     */
    public List<ProjectTaskDTO> getProjectTasks(Long projectId) {
        List<ProjectTask> tasks = taskRepository.findByProjectIdOrderByOrderIndexAsc(projectId);
        return tasks.stream()
                .map(this::mapToTaskDTO)
                .collect(Collectors.toList());
    }

    /**
     * Update project progress based on completed tasks
     */
    private void updateProjectProgress(Long projectId) {
        List<ProjectTask> tasks = taskRepository.findByProjectIdOrderByOrderIndexAsc(projectId);
        
        if (tasks.isEmpty()) return;

        long completedTasks = tasks.stream()
                .filter(task -> task.getStatus() == ProjectTask.TaskStatus.COMPLETED)
                .count();

        int progress = (int) ((completedTasks * 100) / tasks.size());

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        project.setProgressPercentage(progress);
        
        if (progress == 100) {
            project.setStatus(Project.ProjectStatus.COMPLETED);
            project.setCompletedAt(LocalDateTime.now());
        } else if (progress > 0 && project.getStatus() == Project.ProjectStatus.NOT_STARTED) {
            project.setStatus(Project.ProjectStatus.IN_PROGRESS);
            project.setStartedAt(LocalDateTime.now());
        }

        projectRepository.save(project);
    }

    /**
     * Delete task
     */
    @Transactional
    public void deleteTask(Long taskId) {
        ProjectTask task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        Long projectId = task.getProject().getId();
        taskRepository.delete(task);
        updateProjectProgress(projectId);
    }

    /**
     * Map ProjectTask to ProjectTaskDTO
     */
    private ProjectTaskDTO mapToTaskDTO(ProjectTask task) {
        ProjectTaskDTO dto = new ProjectTaskDTO();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setStatus(task.getStatus().name());
        dto.setPriority(task.getPriority().name());
        dto.setOrderIndex(task.getOrderIndex());
        dto.setDueDate(task.getDueDate());
        dto.setCompletedAt(task.getCompletedAt());
        
        if (task.getAssignedTo() != null) {
            dto.setAssignedTo(userService.mapToUserDTO(task.getAssignedTo()));
        }
        
        return dto;
    }
}
