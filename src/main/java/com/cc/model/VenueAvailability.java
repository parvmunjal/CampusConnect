package com.cc.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Data
@Entity
public class VenueAvailability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String venue;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
}
