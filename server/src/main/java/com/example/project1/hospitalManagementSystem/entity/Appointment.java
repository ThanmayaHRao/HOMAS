package com.example.project1.hospitalManagementSystem.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime appointmentTime;

    @Column(length = 500)
    private String reason;

    @ManyToOne//owning side
    @JoinColumn(name = "patient_id",nullable = false)//patient is required and not nullable
    private Patient patient;

    @ManyToOne//owning side
    @JoinColumn(nullable = false)
    private Doctor doctor;
}
