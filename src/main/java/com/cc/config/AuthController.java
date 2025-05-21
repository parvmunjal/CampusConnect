package com.cc.config;

import com.cc.exceptions.EntityNotFoundException;
import com.cc.model.Organizer;
import com.cc.model.User;
import com.cc.repo.OrganizerRepo;
import com.cc.repo.UserRepo;
import com.cc.service.UserService;
import com.cc.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class AuthController {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private OrganizerRepo organizerRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @PostMapping("/organizersignup")
    public ResponseEntity<Organizer> organizerSignup(@RequestBody Organizer organizer) {
        if (organizerRepo.findByEmail(organizer.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        organizer.setPassword(passwordEncoder.encode(organizer.getPassword()));
        Organizer saved = organizerRepo.save(organizer);
        return ResponseEntity.ok(saved);
    }


    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody AuthRequest request) {
        // First, attempt to find the user in the User table
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new EntityNotFoundException("user"));
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
            String token = jwtUtil.generateToken(request.getEmail());
            return ResponseEntity.ok(new AuthResponse(token, user.getId()));
    }
}
