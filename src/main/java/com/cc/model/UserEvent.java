package com.cc.model;

import com.cc.payload.UserEventId;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@IdClass(UserEventId.class) // Specifies composite key
@Table(name = "user_event") // Points to your existing table
public class UserEvent {

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "event_id", referencedColumnName = "id")
    private Event event;
}
