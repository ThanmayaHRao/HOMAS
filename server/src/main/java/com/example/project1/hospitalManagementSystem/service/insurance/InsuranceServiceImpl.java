package com.example.project1.hospitalManagementSystem.service.insurance;

import com.example.project1.hospitalManagementSystem.dto.insurance.*;
import com.example.project1.hospitalManagementSystem.entity.*;
import com.example.project1.hospitalManagementSystem.repository.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InsuranceServiceImpl implements InsuranceService {

    private final InsuranceRepository insuranceRepository;
    private final PatientRepository patientRepository;
    private final ModelMapper modelMapper;

    // ================= CREATE =================
    @Override
    public InsuranceResponseDto createInsurance(InsuranceRequestDto requestDto) {

        if (requestDto.getValidUntil().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Insurance validUntil must be a future date");
        }

        Insurance insurance = modelMapper.map(requestDto, Insurance.class);
        Insurance saved = insuranceRepository.save(insurance);

        return convertToDto(saved);
    }

    // ================= GET BY ID =================
    @Override
    public InsuranceResponseDto getInsuranceById(Long id) {

        Insurance insurance = insuranceRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Insurance not found with id: " + id));

        return convertToDto(insurance);
    }

    // ================= GET ALL =================
    @Override
    public List<InsuranceResponseDto> getAllInsurance() {

        return insuranceRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .toList();
    }

    // ================= ASSIGN =================
    @Override
    @Transactional
    public InsuranceResponseDto assignInsuranceToPatient(Long insuranceId, Long patientId) {

        Insurance insurance = insuranceRepository.findById(insuranceId)
                .orElseThrow(() -> new EntityNotFoundException("Insurance not found"));

        if (insurance.getValidUntil().isBefore(LocalDate.now())) {
            throw new IllegalStateException("Cannot assign expired insurance");
        }
        System.out.println("insurtance is validated");
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found"));

        if (patient.getInsurance() != null) {
            throw new IllegalStateException("Patient already has insurance");
        }

        // 🔥 Set both sides (VERY IMPORTANT)
        patient.setInsurance(insurance);
        insurance.setPatient(patient);

        return convertToDto(insurance);
    }

    // ================= REMOVE =================
    @Override
    @Transactional
    public InsuranceResponseDto disassociateInsuranceFromPatient(Long patientId) {

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found"));

        Insurance insurance = patient.getInsurance();

        if (insurance == null) {
            throw new IllegalStateException("Patient has no insurance to remove");
        }

        patient.setInsurance(null);
        insurance.setPatient(null);

        return convertToDto(insurance);
    }

    // ================= DELETE =================
    @Override
    public void deleteInsurance(Long id) {

        Insurance insurance = insuranceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Insurance not found"));

        if (insurance.getPatient() != null) {
            insurance.getPatient().setInsurance(null);
        }

        insuranceRepository.delete(insurance);
    }

    // ================= DTO MAPPER =================
    private InsuranceResponseDto convertToDto(Insurance insurance) {

        InsuranceResponseDto dto =
                modelMapper.map(insurance, InsuranceResponseDto.class);

        if (insurance.getPatient() != null) {
            dto.setPatientId(insurance.getPatient().getId());
        } else {
            dto.setPatientId(null);
        }

        return dto;
    }
}