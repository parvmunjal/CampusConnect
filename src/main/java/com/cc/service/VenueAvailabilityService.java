package com.cc.service;

import com.cc.exceptions.EntityNotFoundException;
import com.cc.model.VenueAvailability;
import com.cc.repo.VenueAvailabilityRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class VenueAvailabilityService {
    @Autowired
    private VenueAvailabilityRepo venueAvailabilityRepo;
    private static final Logger logger = LoggerFactory.getLogger(EventService.class);


    //create entry
    public VenueAvailability createAvailability(VenueAvailability venueAvailability){
        return venueAvailabilityRepo.save(venueAvailability);
    }
    //get all entry by date
    public List<VenueAvailability> getAllByDate(LocalDate date){
        List<VenueAvailability> venueAvailabilities = venueAvailabilityRepo.findByDate(date);
        if(venueAvailabilities.isEmpty()){
            logger.error("No venue available for the date: {}",date);
            throw new EntityNotFoundException("available venue");
        }
        return venueAvailabilities;
    }
}
