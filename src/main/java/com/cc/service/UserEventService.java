package com.cc.service;

import com.cc.exceptions.EntityNotFoundException;
import com.cc.model.Event;
import com.cc.model.User;
import com.cc.model.UserEvent;
import com.cc.repo.EventRepo;
import com.cc.repo.UserEventRepo;
import com.cc.repo.UserRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserEventService {
    private static final Logger logger = LoggerFactory.getLogger(UserEventService.class);
    @Autowired
    private UserEventRepo userEventRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private EventRepo eventRepo;

    //get bookings by userId(user)
    public List<UserEvent> getBookingsByUserId(Long userId){
        User user = userRepo.findById(userId).orElseThrow(()->new EntityNotFoundException("user"));
        List<UserEvent> bookings=new ArrayList<>();
        if(!userEventRepo.findByUserId(userId).isEmpty()){
            bookings = userEventRepo.findByUserId(userId);
        }
        else{
            logger.error("No bookings found for the given userId {}",userId);
            throw new EntityNotFoundException("bookings");
        }
        return bookings;
    }
    //get registered users for the event(organizer)
    public List<UserEvent> getUsersByEventId(Long eventId){
        Event event = eventRepo.findById(eventId).orElseThrow(() -> new EntityNotFoundException("event"));
        List<UserEvent> bookings=new ArrayList<>();
        if(!userEventRepo.findByEventId(eventId).isEmpty()){
            bookings=userEventRepo.findByEventId(eventId);
        }
        else{
            logger.error("No bookings found for the given eventId {}",eventId);
            throw new EntityNotFoundException("bookings");
        }
        return bookings;
    }
}
