package com.cc.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "pending_approvals")
@Data
public class PendingApproval {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String eventName;

    private String description;

    private String location;

    private Date eventDate;

    private Double registrationFee;

    private String posterUrl;

    private Long organizerId;

}
