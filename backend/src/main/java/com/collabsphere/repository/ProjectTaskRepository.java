package com.collabsphere.repository;

import com.collabsphere.model.ProjectTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectTaskRepository extends JpaRepository<ProjectTask, Long> {
    List<ProjectTask> findByProjectIdOrderByOrderIndexAsc(Long projectId);
    List<ProjectTask> findByAssignedToId(Long userId);
}
