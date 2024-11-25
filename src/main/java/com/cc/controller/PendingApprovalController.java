package com.cc.controller;

import com.cc.model.PendingApproval;
import com.cc.service.PendingApprovalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/events")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class PendingApprovalController {
    @Autowired
    private PendingApprovalService pendingApprovalService;

    //create event
    @PostMapping("/create")
    public ResponseEntity<PendingApproval> createEvent(@RequestBody PendingApproval pendingApproval){
        PendingApproval event = pendingApprovalService.createEvent(pendingApproval);
        return new ResponseEntity<>(event,HttpStatus.CREATED);
    }
    //approve event
    @PostMapping("/approve/{id}")
    public ResponseEntity<Void> approveEvent(@PathVariable Long id){
        pendingApprovalService.approveEvent(id);
        return ResponseEntity.ok().build();
    }
    //reject event
    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> rejectEvent(@PathVariable Long id){
        pendingApprovalService.rejectEvent(id);
        return ResponseEntity.ok().build();
    }   
    //get all events
    @GetMapping
    public ResponseEntity<List<PendingApproval>> getAllPendingEvents(){
        List<PendingApproval> events = pendingApprovalService.getAllEvents();
        return ResponseEntity.ok(events);
    }
    //get event by id
    @GetMapping("/{id}")
    public ResponseEntity<PendingApproval> getEventById(@PathVariable Long id){
        PendingApproval event = pendingApprovalService.getEventById(id);
        return ResponseEntity.ok(event);
    }
}
