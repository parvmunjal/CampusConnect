package com.cc.service;

import com.cc.model.VenueAvailability;
import com.cc.repo.VenueAvailabilityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class VenueAvailabilityService {
    @Autowired
    private VenueAvailabilityRepo venueAvailabilityRepo;
    //create entry
    public VenueAvailability createAvailability(VenueAvailability venueAvailability){
        return venueAvailabilityRepo.save(venueAvailability);
    }
    //get all entry by date
    public List<VenueAvailability> getAllByDate(LocalDate date){
        return venueAvailabilityRepo.findByDate(date);
    }
}
