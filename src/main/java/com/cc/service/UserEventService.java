package com.cc.service;

import com.cc.model.Event;
import com.cc.model.UserEvent;
import com.cc.repo.UserEventRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserEventService {
    @Autowired
    private UserEventRepo userEventRepo;

    //get bookings by userId
    public List<UserEvent> getBookingsByUserId(Long userId){
        return userEventRepo.findByUserId(userId);
    }
    //get registered users for the event
    public List<UserEvent> getUsersByEventId(Long eventId){
        return userEventRepo.findByEventId(eventId);
    }
}
