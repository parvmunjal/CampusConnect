package com.cc.controller;

import com.cc.model.Event;
import com.cc.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class EventController {
    @Autowired
    private EventService eventService;

    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event Event){
        Event savedEvent = eventService.createEvent(Event);
        return new ResponseEntity<>(savedEvent, HttpStatus.CREATED);
    }
    @GetMapping("/{eventId}")
    public ResponseEntity<Event> getEventById(@PathVariable Long eventId){
        Event event = eventService.getEventById(eventId);
        return ResponseEntity.ok(event);
    }
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents(){
        List<Event> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }
    @DeleteMapping("/delete/{eventId}")
    public ResponseEntity<String> deleteEvent(@PathVariable Long eventId){
        eventService.deleteEvent(eventId);
        return ResponseEntity.ok("Event Deleted!");
    }
    @PostMapping("/{eventId}/register/{userId}")
    public ResponseEntity<Event> registerEvent(@PathVariable Long eventId,@PathVariable Long userId){
        Event event = eventService.registerEvent(eventId, userId);
        return ResponseEntity.ok(event);
    }
    @GetMapping("/byorganizer/{organizerId}")
    public ResponseEntity<List<Event>> getEventByOrganizerId(@PathVariable Long organizerId){
        List<Event> events = eventService.getEventByOrganizerId(organizerId);
        return ResponseEntity.ok(events);
    }
    @PutMapping("/{eventId}")
    public ResponseEntity<Event> updateEvent(@RequestBody Event event, @PathVariable Long eventId){
        Event updatedEvent = eventService.updateEvent(event, eventId);
        return ResponseEntity.ok(updatedEvent);
    }
}
