package com.cc.service;

import com.cc.exceptions.EntityAlreadyExistsException;
import com.cc.exceptions.EntityNotFoundException;
import com.cc.model.Event;
import com.cc.model.User;
import com.cc.repo.EventRepo;
import com.cc.repo.UserRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@Service
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private EventRepo eventRepo;

    //create user
    public User createUser(User user){
        logger.info("Creating user with email:{}",user.getEmail());
        if(userRepo.findByEmail(user.getEmail()).isPresent()){
            logger.error("User already exists by this email!");
            throw new EntityAlreadyExistsException();
        }
        if(user.getEmail()==null || user.getRole()==null || user.getName()==null || user.getPassword()==null){
            logger.error("Enter all required fields!");
            throw new IllegalArgumentException("Enter all required fields");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepo.save(user);
        logger.info("User created successfully with email:{}", user.getEmail());
        return savedUser;
    }
    //get user by id
    public User getUserById(Long userId){
        User user = userRepo.findById(userId).orElseThrow(EntityNotFoundException::new);
        logger.info("User found with userId:{}",userId);
        return user;
    }
    //get all users
    public List<User> getAllUsers(){
        return userRepo.findAll();
    }
    public User getUserByEmail(String email){
        logger.info("Email {}",email);
        User user=userRepo.findByEmail(email).orElseThrow(EntityNotFoundException::new);
        logger.info("User found with userId:{}",user.getId());
        return user;
    }
    public List<User> getUsersByEventId(Long eventId){
        Event event = eventRepo.findById(eventId).orElseThrow(() -> new EntityNotFoundException("event"));
        Set<User> user = event.getUsers();
        return new ArrayList<>(user);
    }
}
