package com.example.project1.hospitalManagementSystem.service.insurance;

import com.example.project1.hospitalManagementSystem.entity.Insurance;
import com.example.project1.hospitalManagementSystem.entity.Patient;
import com.example.project1.hospitalManagementSystem.repository.InsuranceRepository;
import com.example.project1.hospitalManagementSystem.repository.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class InsuranceService {

    private final InsuranceRepository insuranceRepository;
    private final PatientRepository patientRepository;
    private final ModelMapper modelMapper;

    @Transactional
    public Patient  assignInsuranceToPatient(Insurance insurance,Long patientId){
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() ->new EntityNotFoundException("Patient not found with id: " + patientId));
        patient.setInsurance(insurance);
        insurance.setPatient(patient);//bidirectional consistency maintainence
        return patient;
    }
    @Transactional
    public Patient disassociateInsuranceFromPatient(Long patientId){
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() ->new EntityNotFoundException("Patient not found with id: " + patientId));

        patient.setInsurance(null);

        return patient;
    }
}
