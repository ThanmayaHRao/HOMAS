package com.example.project1.hospitalManagementSystem.dto.doctor;

import lombok.Data;

@Data
public class DoctorResponseDto {

    private Long id;
    private String name;
    private String specialization;
    private String email;

    private String departmentName;
}