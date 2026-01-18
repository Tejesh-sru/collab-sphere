package com.collabsphere.repository;

import com.collabsphere.model.TeamMember;
import com.collabsphere.model.TeamMember.MemberStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamMemberRepository extends JpaRepository<TeamMember, Long> {
    List<TeamMember> findByTeamId(Long teamId);
    List<TeamMember> findByTeamIdAndStatus(Long teamId, MemberStatus status);
    List<TeamMember> findByUserId(Long userId);
    List<TeamMember> findByUserIdAndStatus(Long userId, MemberStatus status);
    Optional<TeamMember> findByTeamIdAndUserId(Long teamId, Long userId);
    long countByTeamIdAndStatus(Long teamId, MemberStatus status);
}
