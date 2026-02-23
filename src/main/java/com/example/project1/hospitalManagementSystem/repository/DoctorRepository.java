package com.example.project1.hospitalManagementSystem.repository;

import com.example.project1.hospitalManagementSystem.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

}