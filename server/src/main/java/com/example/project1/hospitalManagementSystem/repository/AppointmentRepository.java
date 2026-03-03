package com.example.project1.hospitalManagementSystem.repository;

import com.example.project1.hospitalManagementSystem.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    boolean existsByDoctor_IdAndAppointmentTime(
            Long doctorId,
            LocalDateTime appointmentTime
    );

    boolean existsByDoctor_IdAndAppointmentTimeAndIdNot(
            Long doctorId,
            LocalDateTime appointmentTime,
            Long id
    );
}