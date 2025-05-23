package com.cc.repo;

import com.cc.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepo extends JpaRepository<Event,Long> {
    List<Event> findByOrganizerId(Long organizerId);
    List<Event> findByPendingStatusTrue();
    List<Event> findByPendingStatusTrueAndRejectStatusFalse();
    List<Event> findByPendingStatusFalseAndRejectStatusFalse();
}
