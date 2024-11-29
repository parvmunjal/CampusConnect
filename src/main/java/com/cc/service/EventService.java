package com.cc.service;

import com.cc.model.Event;
import com.cc.model.User;
import com.cc.repo.EventRepo;
import com.cc.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class EventService {
    @Autowired
    private EventRepo eventRepo;
    @Autowired
    private UserRepo userRepo;
    //create event
    public Event createEvent(Event event){
        return eventRepo.save(event);
    }
    //delete event
    public void deleteEvent(Long eventId){
        eventRepo.deleteById(eventId);
    }
    //get all events
    public List<Event> getAllEvents(){
        return eventRepo.findAll();
    }
    //get event by id
    public Event getEventById(Long eventId){
        return eventRepo.findById(eventId).orElseThrow();
    }
    //register event by user
    public Event registerEvent(Long eventId,Long userId) {
        Event event = eventRepo.findById(eventId).orElseThrow();
        User user = userRepo.findById(userId).orElseThrow();

        user.getEvents().add(event);
        event.getUsers().add(user);

        userRepo.save(user);
        return eventRepo.save(event);
    }
    public List<Event> getEventByOrganizerId(Long organizerId){
        return eventRepo.findByOrganizerId(organizerId);
    }
    //update event
    public Event updateEvent(Event event,Long eventId){
        Event savedEvent = eventRepo.findById(eventId).orElseThrow();
        savedEvent.setEventName(event.getEventName());
        savedEvent.setEventDate(event.getEventDate());
        savedEvent.setDescription(event.getDescription());
        savedEvent.setLocation(event.getLocation());
        savedEvent.setPosterUrl(event.getPosterUrl());
        savedEvent.setRegistrationFee(event.getRegistrationFee());

        return eventRepo.save(savedEvent);
    }
}
