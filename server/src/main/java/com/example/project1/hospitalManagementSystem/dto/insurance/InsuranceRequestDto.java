package com.example.project1.hospitalManagementSystem.dto.insurance;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class InsuranceRequestDto {

    @NotBlank(message = "Policy number is required")
    private String policyNumber;

    @NotNull(message = "Valid until date is required")
    @Future(message = "Insurance must be valid in the future")
    private LocalDate validUntil;
}