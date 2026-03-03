package com.example.project1.hospitalManagementSystem.service.insurance;

import com.example.project1.hospitalManagementSystem.dto.insurance.InsuranceRequestDto;
import com.example.project1.hospitalManagementSystem.dto.insurance.InsuranceResponseDto;
import jakarta.validation.Valid;

import java.util.List;

public interface InsuranceService {
    InsuranceResponseDto createInsurance(@Valid InsuranceRequestDto requestDto);

    InsuranceResponseDto getInsuranceById(Long id);

    List<InsuranceResponseDto> getAllInsurance();

    InsuranceResponseDto assignInsuranceToPatient(Long insuranceId, Long patientId);

    InsuranceResponseDto disassociateInsuranceFromPatient(Long patientId);

    void deleteInsurance(Long id);
}
