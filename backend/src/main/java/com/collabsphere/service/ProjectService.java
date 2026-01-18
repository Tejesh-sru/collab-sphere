package com.collabsphere.service;

import com.collabsphere.dto.ProjectDTO;
import com.collabsphere.dto.ProjectRequest;
import com.collabsphere.dto.UserDTO;
import com.collabsphere.model.Project;
import com.collabsphere.model.User;
import com.collabsphere.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserService userService;

    public ProjectDTO createProject(ProjectRequest request) {
        User currentUser = userService.getCurrentUser();

        Project project = new Project();
        project.setUser(currentUser);
        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setImageUrl(request.getImageUrl());
        project.setProjectUrl(request.getProjectUrl());
        project.setGithubUrl(request.getGithubUrl());
        project.setTechnologies(request.getTechnologies());
        
        if (request.getStatus() != null) {
            project.setStatus(Project.ProjectStatus.valueOf(request.getStatus()));
        }

        project = projectRepository.save(project);
        return mapToProjectDTO(project);
    }

    public ProjectDTO updateProject(Long projectId, ProjectRequest request) {
        User currentUser = userService.getCurrentUser();
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        if (!project.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized to update this project");
        }

        if (request.getTitle() != null) project.setTitle(request.getTitle());
        if (request.getDescription() != null) project.setDescription(request.getDescription());
        if (request.getImageUrl() != null) project.setImageUrl(request.getImageUrl());
        if (request.getProjectUrl() != null) project.setProjectUrl(request.getProjectUrl());
        if (request.getGithubUrl() != null) project.setGithubUrl(request.getGithubUrl());
        if (request.getTechnologies() != null) project.setTechnologies(request.getTechnologies());
        if (request.getStatus() != null) project.setStatus(Project.ProjectStatus.valueOf(request.getStatus()));

        project = projectRepository.save(project);
        return mapToProjectDTO(project);
    }

    public void deleteProject(Long projectId) {
        User currentUser = userService.getCurrentUser();
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        if (!project.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized to delete this project");
        }

        projectRepository.delete(project);
    }

    public ProjectDTO getProject(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        return mapToProjectDTO(project);
    }

    public List<ProjectDTO> getMyProjects() {
        User currentUser = userService.getCurrentUser();
        return projectRepository.findByUserOrderByCreatedAtDesc(currentUser)
                .stream()
                .map(this::mapToProjectDTO)
                .collect(Collectors.toList());
    }

    public List<ProjectDTO> getUserProjects(Long userId) {
        User user = userService.getProfile(userId).getId() != null 
            ? new User() : null;
        return projectRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::mapToProjectDTO)
                .collect(Collectors.toList());
    }

    public List<ProjectDTO> searchProjects(String search) {
        if (search == null || search.trim().isEmpty()) {
            return projectRepository.findAll().stream()
                    .map(this::mapToProjectDTO)
                    .collect(Collectors.toList());
        }
        return projectRepository.searchProjects(search)
                .stream()
                .map(this::mapToProjectDTO)
                .collect(Collectors.toList());
    }

    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::mapToProjectDTO)
                .collect(Collectors.toList());
    }

    public List<ProjectDTO> getProjectsByTechnology(List<String> technologies) {
        return projectRepository.findByTechnologies(technologies)
                .stream()
                .map(this::mapToProjectDTO)
                .collect(Collectors.toList());
    }

    public ProjectDTO mapToProjectDTO(Project project) {
        return ProjectDTO.builder()
                .id(project.getId())
                .user(mapToUserDTO(project.getUser()))
                .title(project.getTitle())
                .description(project.getDescription())
                .imageUrl(project.getImageUrl())
                .projectUrl(project.getProjectUrl())
                .githubUrl(project.getGithubUrl())
                .technologies(project.getTechnologies())
                .status(project.getStatus().name())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }

    private UserDTO mapToUserDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .displayName(user.getDisplayName())
                .photoURL(user.getPhotoURL())
                .build();
    }
}
