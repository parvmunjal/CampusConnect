package com.cc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Data
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventName;

    private String description;

    private String location;

    private Date eventDate;

    private Double registrationFee;

    private String posterUrl;

    @ManyToOne
    @JoinColumn(name = "organizer_id", nullable = false)
    private Organizer organizer;

    @ManyToMany
    @JoinTable(
            name = "user_event",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @JsonIgnore
    private Set<User> users = new HashSet<>();

    private boolean pendingStatus;

    private boolean rejectStatus;

    // Constructors, Getters, and Setters

    @Override
    public int hashCode() {
        // Generate hash code based only on unique fields to avoid circular reference
        return Objects.hash(id, eventName, eventDate);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Event event = (Event) obj;
        return Objects.equals(id, event.id) &&
                Objects.equals(eventName, event.eventName);
    }
}
