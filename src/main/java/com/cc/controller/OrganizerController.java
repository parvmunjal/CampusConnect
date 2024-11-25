package com.cc.controller;

import com.cc.model.Organizer;
import com.cc.model.Organizer;
import com.cc.service.OrganizerService;
import com.cc.service.OrganizerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/organizers")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class OrganizerController {
    @Autowired
    private OrganizerService organizerService;

    @PostMapping
    public ResponseEntity<Organizer> createOrganizer(@RequestBody Organizer organizer){
        Organizer savedorganizer = organizerService.createOrganizer(organizer);
        return new ResponseEntity<>(savedorganizer, HttpStatus.CREATED);
    }
    @GetMapping("/{organizerId}")
    public ResponseEntity<Organizer> getOrganizerById(@PathVariable Long organizerId){
        Organizer organizer = organizerService.getOrganizerById(organizerId);
        return ResponseEntity.ok(organizer);
    }
    @GetMapping
    public ResponseEntity<List<Organizer>> getAllOrganizers(){
        List<Organizer> organizers = organizerService.getAllOrganizers();
        return ResponseEntity.ok(organizers);
    }
}
