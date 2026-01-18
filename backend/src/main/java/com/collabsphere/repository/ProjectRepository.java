package com.collabsphere.repository;

import com.collabsphere.model.Project;
import com.collabsphere.model.Team;
import com.collabsphere.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    List<Project> findByUserOrderByCreatedAtDesc(User user);
    
    List<Project> findByStatusOrderByCreatedAtDesc(Project.ProjectStatus status);
    
    Optional<Project> findByTeam(Team team);
    
    @Query("SELECT p FROM Project p WHERE " +
           "(LOWER(p.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Project> searchProjects(@Param("search") String search);
    
    @Query("SELECT p FROM Project p JOIN p.technologies t " +
           "WHERE LOWER(t) IN :technologies")
    List<Project> findByTechnologies(@Param("technologies") List<String> technologies);
}
