package com.cc.controller;

import com.cc.model.UserEvent;
import com.cc.service.UserEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class UserEventController {
    @Autowired
    private UserEventService userEventService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserEvent>> getBookingsById(@PathVariable Long userId){
        List<UserEvent> bookings = userEventService.getBookingsByUserId(userId);
        return ResponseEntity.ok(bookings);
    }
    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<UserEvent>> getUsersByEventId(@PathVariable Long eventId){
        List<UserEvent> users = userEventService.getUsersByEventId(eventId);
        return ResponseEntity.ok(users);
    }
}
