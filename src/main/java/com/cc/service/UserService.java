package com.cc.service;

import com.cc.model.User;
import com.cc.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    //create user
    public User createUser(User user){
        return userRepo.save(user);
    }
    //get user by id
    public User getUserById(Long userId){
        return userRepo.findById(userId).orElseThrow();
    }
    //get all users
    public List<User> getAllUsers(){
        return userRepo.findAll();
    }
}
