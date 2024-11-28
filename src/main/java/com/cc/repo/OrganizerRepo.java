package com.cc.repo;

import com.cc.model.Organizer;
import com.cc.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrganizerRepo extends JpaRepository<Organizer,Long> {
    Optional<Organizer> findByEmail(String email);
}
