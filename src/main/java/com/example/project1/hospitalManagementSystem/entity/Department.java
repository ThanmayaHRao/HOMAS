package com.example.project1.hospitalManagementSystem.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,unique = true,length = 100)
    private String name;

    @OneToOne
    @JoinColumn(name = "head_doctor_id",unique = true)//owning side
    private Doctor headDoctor;

    @OneToMany(mappedBy ="department",cascade = CascadeType.ALL,
            orphanRemoval = true)
    private Set<Doctor> doctors = new HashSet<>();
}
