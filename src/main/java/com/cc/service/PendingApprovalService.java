package com.cc.service;

import com.cc.model.Event;
import com.cc.model.Organizer;
import com.cc.model.PendingApproval;
import com.cc.repo.PendingApprovalRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PendingApprovalService {
    @Autowired
    private PendingApprovalRepo pendingApprovalRepo;
    @Autowired
    private EventService eventService;
    @Autowired
    private OrganizerService organizerService;

    //save event
    public PendingApproval createEvent(PendingApproval pendingApproval){
        return pendingApprovalRepo.save(pendingApproval);
    }
    //approve event
    public void approveEvent(Long id){
        PendingApproval pendingApproval = pendingApprovalRepo.findById(id).orElseThrow();
        Event event = new Event();
        event.setEventName(pendingApproval.getEventName());
        event.setLocation(pendingApproval.getLocation());
        event.setEventDate(pendingApproval.getEventDate());
        event.setDescription(pendingApproval.getDescription());
        event.setRegistrationFee(pendingApproval.getRegistrationFee());
        event.setPosterUrl(pendingApproval.getPosterUrl());
        Organizer organizer = organizerService.getOrganizerById(pendingApproval.getOrganizerId());
        event.setOrganizer(organizer);

        eventService.createEvent(event);

        pendingApprovalRepo.deleteById(id);
    }
    //delete event
    public void rejectEvent(Long id){
        pendingApprovalRepo.deleteById(id);
    }
    //get all events
    public List<PendingApproval> getAllEvents(){
        return pendingApprovalRepo.findAll();
    }
    //get event by id
    public PendingApproval getEventById(Long id){
        return pendingApprovalRepo.findById(id).orElseThrow();
    }
}
