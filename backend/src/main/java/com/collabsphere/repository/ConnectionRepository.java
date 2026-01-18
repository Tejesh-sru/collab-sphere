package com.collabsphere.repository;

import com.collabsphere.model.Connection;
import com.collabsphere.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConnectionRepository extends JpaRepository<Connection, Long> {
    
    List<Connection> findBySenderAndStatus(User sender, Connection.Status status);
    
    List<Connection> findByReceiverAndStatus(User receiver, Connection.Status status);
    
    @Query("SELECT c FROM Connection c WHERE " +
           "((c.sender = :user OR c.receiver = :user) AND c.status = :status)")
    List<Connection> findByUserAndStatus(@Param("user") User user, 
                                         @Param("status") Connection.Status status);
    
    @Query("SELECT c FROM Connection c WHERE " +
           "((c.sender = :user1 AND c.receiver = :user2) OR " +
           "(c.sender = :user2 AND c.receiver = :user1))")
    Optional<Connection> findConnectionBetweenUsers(@Param("user1") User user1, 
                                                     @Param("user2") User user2);
    
    @Query("SELECT COUNT(c) FROM Connection c WHERE " +
           "(c.sender = :user OR c.receiver = :user) AND c.status = 'ACCEPTED'")
    Long countUserConnections(@Param("user") User user);
}
