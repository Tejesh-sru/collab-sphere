package com.collabsphere.repository;

import com.collabsphere.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    Boolean existsByEmail(String email);
    
    List<User> findByIsActiveTrue();
    
    @Query("SELECT u FROM User u WHERE u.isActive = true AND " +
           "(LOWER(u.displayName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(u.university) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(u.major) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<User> searchUsers(@Param("search") String search);
    
    @Query("SELECT u FROM User u JOIN u.skills s WHERE LOWER(s) IN :skills AND u.isActive = true")
    List<User> findBySkills(@Param("skills") List<String> skills);
}
