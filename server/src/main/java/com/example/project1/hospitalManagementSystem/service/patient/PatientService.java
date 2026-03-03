package com.example.project1.hospitalManagementSystem.service.patient;

import com.example.project1.hospitalManagementSystem.dto.patient.PatientRequestDto;
import com.example.project1.hospitalManagementSystem.dto.patient.PatientResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PatientService {

    PatientResponseDto createPatient(PatientRequestDto dto);

    PatientResponseDto getPatientById(Long id);

    Page<PatientResponseDto> getAllPatients(Pageable pageable);

    PatientResponseDto updatePatient(Long id, PatientRequestDto dto);

    void deletePatient(Long id);
}
