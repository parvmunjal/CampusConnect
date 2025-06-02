package com.cc.service;

import com.cc.exceptions.EntityNotFoundException;
import com.cc.model.Event;
import com.cc.model.Organizer;
import com.cc.model.User;
import com.cc.repo.EventRepo;
import com.cc.repo.OrganizerRepo;
import com.cc.repo.UserRepo;
import org.apache.coyote.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class EventService {
    @Autowired
    private EventRepo eventRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private OrganizerRepo organizerRepo;
    private static final Logger logger = LoggerFactory.getLogger(EventService.class);
    @Autowired
    private OrganizerService organizerService;
    //create event
    public Event createEvent(Event event){
        Long userId=event.getOrganizer().getId();
        Organizer organizerByUserId = organizerService.getOrganizerByUserId(userId);
        Long organizerId=organizerByUserId.getId();
        Organizer organizer = organizerRepo.findById(organizerId)
                .orElseThrow(() -> new EntityNotFoundException("organizer"));
        event.setPendingStatus(true);
        event.setRejectStatus(false);
        event.getOrganizer().setId(organizerId);
        Event savedEvent=eventRepo.save(event);
        if(organizer.getEvents().isEmpty()){
            organizer.setEvents(new ArrayList<>());
        }
        organizer.getEvents().add(savedEvent);
        organizerRepo.save(organizer);
        logger.info("Event created with id: {}",savedEvent.getId());
        return savedEvent;
    }
    //delete event
    public void deleteEvent(Long eventId){
        if(eventRepo.findById(eventId).isEmpty()){
            logger.error("Event doesn't exist by event id: {}",eventId);
            throw new EntityNotFoundException("event");
        }
        eventRepo.deleteById(eventId);
    }
    //get all events
    public List<Event> getAllEvents(){
        return eventRepo.findAll();
    }
    //get event by id
    public Event getEventById(Long eventId){
        return eventRepo.findById(eventId).orElseThrow(()->new EntityNotFoundException("event"));
    }
    //register event by user
    public Event registerEvent(Long eventId,Long userId) {
        Event event = eventRepo.findById(eventId).orElseThrow(()->new EntityNotFoundException("event"));
        User user = userRepo.findById(userId).orElseThrow(()->new EntityNotFoundException("user"));

        user.getEvents().add(event);
        event.getUsers().add(user);

        userRepo.save(user);
        return eventRepo.save(event);
    }
    public List<Event> getEventByOrganizerId(Long userId){
        Organizer organizer = organizerService.getOrganizerByUserId(userId);
        Long organizerId= organizer.getId();
        if(!organizerRepo.existsById(organizerId)){
            logger.error("Organizer doesn't exist by organizerId: {}",organizerId);
            throw new EntityNotFoundException("organizer");
        }
        return eventRepo.findByOrganizerId(organizerId);
    }
    //update event
    public Event updateEvent(Event event,Long eventId){
        Event savedEvent = eventRepo.findById(eventId).orElseThrow(()->new EntityNotFoundException("event"));
        savedEvent.setEventName(event.getEventName());
        savedEvent.setEventDate(event.getEventDate());
        savedEvent.setDescription(event.getDescription());
        savedEvent.setLocation(event.getLocation());
        savedEvent.setPosterUrl(event.getPosterUrl());
        savedEvent.setRegistrationFee(event.getRegistrationFee());
        return eventRepo.save(savedEvent);
    }
    public List<Event> getAllEventsByUserId(Long userId){
        User user = userRepo.findById(userId).orElseThrow(() -> new EntityNotFoundException("user"));
        return new ArrayList<>(user.getEvents());
    }
    public List<Event> getAllPendingEvents(){
        List<Event> pendingApproval = eventRepo.findByPendingStatusTrueAndRejectStatusFalse();
        if(pendingApproval.isEmpty()){
            throw new EntityNotFoundException("events with pending approval");
        }
        return pendingApproval;
    }
    public Event getPendingEventById(Long eventId){
        Event event = eventRepo.findById(eventId).orElseThrow(() -> new EntityNotFoundException("event"));
        if(!event.isPendingStatus()){
            logger.error("Event with id: {} is not having a pending status ",eventId);
            throw new EntityNotFoundException("pending event");
        }
        return event;
    }
    public Event approveEvent(Long eventId){
        Event event = eventRepo.findById(eventId).orElseThrow(() -> new EntityNotFoundException("event"));
        if(!event.isPendingStatus()){
            logger.error("Event with id: {} is already approved",eventId);
            throw new IllegalArgumentException("Event is already approved");
        }
        event.setPendingStatus(false);
        return eventRepo.save(event);
    }
    public Event rejectEvent(Long eventId){
        Event event = eventRepo.findById(eventId).orElseThrow(() -> new EntityNotFoundException("event"));
        if(!event.isPendingStatus()){
            logger.error("Event with id: {} is already approved",eventId);
            throw new IllegalArgumentException("Event is already approved");
        }
        event.setRejectStatus(true);
        return eventRepo.save(event);
    }
    public List<Event> getAllApprovedEvents(){
        List<Event> events = eventRepo.findByPendingStatusFalseAndRejectStatusFalse();
        if(events.isEmpty()){
            logger.error("No approved events found");
            throw new EntityNotFoundException("approved events");
        }
        return events;
    }
}
