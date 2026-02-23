package com.example.project1.hospitalManagementSystem.entity;

import com.example.project1.hospitalManagementSystem.entity.type.BloodGroup;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@ToString
@Entity
@Getter
@Setter
@Table(
        name = "patient",
        uniqueConstraints = {

                @UniqueConstraint(name = "unique_patient_name_birth_date",columnNames = {"name","birth_date"})
        },
        indexes = {
                @Index(name = "idx_patient_birth_date",columnList = "birth_date")
        }
)
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id;

    @Column(nullable = false,length = 40)
    private String name;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(unique = true,nullable = false)
    private String email;

    @Column(nullable = false,length = 40)
    private String gender;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private BloodGroup blood_group;

    @OneToOne(cascade = {CascadeType.ALL},orphanRemoval = true)
    @JoinColumn(name = "patient_insurance_id") //owning side
    private Insurance insurance;

    @OneToMany(mappedBy = "patient",cascade = {CascadeType.REMOVE},orphanRemoval = true)//inverse side for appointment
    private List<Appointment> appointment = new ArrayList<>();

}
