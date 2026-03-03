package com.example.project1.hospitalManagementSystem.dto.doctor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DoctorRequestDto {

    @NotBlank(message = "Doctor name is required")
    private String name;

    private String specialization;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    private Long departmentId;
}