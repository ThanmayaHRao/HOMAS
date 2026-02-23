package com.example.project1.hospitalManagementSystem.repository;

import com.example.project1.hospitalManagementSystem.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

}