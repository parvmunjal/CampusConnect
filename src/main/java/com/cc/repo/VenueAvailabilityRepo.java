package com.cc.repo;

import com.cc.model.VenueAvailability;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface VenueAvailabilityRepo extends JpaRepository<VenueAvailability,Long> {
    List<VenueAvailability> findByDate(LocalDate date);
}
