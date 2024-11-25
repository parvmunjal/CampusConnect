package com.cc.controller;

import com.cc.model.VenueAvailability;
import com.cc.service.VenueAvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/availability")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class VenueAvailabilityController {
    @Autowired
    private VenueAvailabilityService venueAvailabilityService;


    //create availability
    @PostMapping
    public ResponseEntity<VenueAvailability> createAvailability(@RequestBody VenueAvailability venueAvailability){
        VenueAvailability availability = venueAvailabilityService.createAvailability(venueAvailability);
        return new ResponseEntity<>(availability, HttpStatus.CREATED);
    }
    //get all by date
    @GetMapping("{date}")
    public ResponseEntity<List<VenueAvailability>> getAll(@PathVariable LocalDate date){
        List<VenueAvailability> availabilities = venueAvailabilityService.getAllByDate(date);
        return ResponseEntity.ok(availabilities);
    }
}
