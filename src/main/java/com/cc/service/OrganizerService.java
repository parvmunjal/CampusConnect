package com.cc.service;

import com.cc.exceptions.EntityNotFoundException;
import com.cc.model.Organizer;
import com.cc.model.Role;
import com.cc.model.User;
import com.cc.repo.OrganizerRepo;
import com.cc.repo.UserRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrganizerService {
    private static final Logger logger = LoggerFactory.getLogger(OrganizerService.class);
    @Autowired
    private OrganizerRepo organizerRepo;
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;


    //create organizer
    public Organizer createOrganizer(Organizer organizer){
        User user=new User();
        user.setName(organizer.getName());
        user.setEmail(organizer.getEmail());
        user.setPassword(organizer.getPassword());
        user.setRole(Role.ROLE_ORGANIZER);
        user.setPhoneNumber(organizer.getPhoneNumber());
        userService.createUser(user);
        organizer.setPassword(passwordEncoder.encode(organizer.getPassword()));
        Organizer savedOrganizer = organizerRepo.save(organizer);
        logger.info("Organizer created with id: {}", savedOrganizer.getId());
        return savedOrganizer;
    }
    //get organizer by id
    public Organizer getOrganizerById(Long organizerId){
        return organizerRepo.findById(organizerId).orElseThrow(()->new EntityNotFoundException("organizer"));
    }
    //get all organizers
    public List<Organizer> getAllOrganizers(){
        return organizerRepo.findAll();
    }
}
