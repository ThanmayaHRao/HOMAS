package com.example.project1.hospitalManagementSystem.dto.insurance;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class InsuranceResponseDto {

    private Long id;
    private String policyNumber;
    private LocalDate validUntil;
    private LocalDateTime createdAt;
    private Long patientId;   // only ID, not full patient object
}