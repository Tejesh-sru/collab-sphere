package com.collabsphere.repository;

import com.collabsphere.model.Team;
import com.collabsphere.model.Team.TeamStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    List<Team> findByLeaderId(Long leaderId);
    List<Team> findByMentorId(Long mentorId);
    List<Team> findByStatus(TeamStatus status);
    
    @Query("SELECT t FROM Team t JOIN t.members m WHERE m.user.id = :userId AND m.status = 'ACCEPTED'")
    List<Team> findTeamsByMemberId(@Param("userId") Long userId);
}
