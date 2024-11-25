package com.cc.repo;

import com.cc.model.Event;
import com.cc.model.UserEvent;
import com.cc.payload.UserEventId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserEventRepo extends JpaRepository<UserEvent, UserEventId> {
    List<UserEvent> findByUserId(Long userId);
    List<UserEvent> findByEventId(Long eventId);
}
