package com.cc.config;

import com.cc.model.Organizer;
import com.cc.model.Role;
import com.cc.model.User;
import com.cc.repo.OrganizerRepo;
import com.cc.repo.UserRepo;
import com.cc.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User saved = userRepository.save(user);
        return ResponseEntity.ok(saved);
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
        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (user != null) {
            // Validate password for the user
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                throw new RuntimeException("Invalid email or password");
            }

            // Generate token for the user
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
            return ResponseEntity.ok(new AuthResponse(token, user.getRole(), user.getId()));
        }

        // If user is not found, check in the Organizer table
        Organizer organizer = organizerRepo.findByEmail(request.getEmail()).orElseThrow(() ->
                new RuntimeException("Invalid email or password")
        );

        // Validate password for the organizer
        if (!passwordEncoder.matches(request.getPassword(), organizer.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // Generate token for the organizer
        String token = jwtUtil.generateToken(organizer.getEmail(), Role.valueOf("ROLE_ORGANIZER"));
        return ResponseEntity.ok(new AuthResponse(token, Role.valueOf("ROLE_ORGANIZER"), organizer.getId()));
    }


}
