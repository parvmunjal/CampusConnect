package com.cc.service;

import com.cc.model.Organizer;
import com.cc.repo.OrganizerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrganizerService {
    @Autowired
    private OrganizerRepo organizerRepo;

    //create organizer
    public Organizer createOrganizer(Organizer organizer){
        return organizerRepo.save(organizer);
    }
    //get organizer by id
    public Organizer getOrganizerById(Long organizerId){
        return organizerRepo.findById(organizerId).orElseThrow();
    }
    //get all organizers
    public List<Organizer> getAllOrganizers(){
        return organizerRepo.findAll();
    }
}
