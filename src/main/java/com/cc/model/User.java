package com.cc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String password;
    
    private String phoneNumber;

    @ManyToMany(mappedBy = "users")
    @JsonIgnore  // Prevents circular reference when serializing
    private Set<Event> events = new HashSet<>();

    // Constructors, Getters, and Setters

    @Override
    public int hashCode() {
        // Generate hash code based only on unique fields to avoid circular reference
        return Objects.hash(id, email, name, phoneNumber);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        User user = (User) obj;
        return Objects.equals(id, user.id) &&
                Objects.equals(email, user.email);
    }
}
