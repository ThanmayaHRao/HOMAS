package com.example.project1.hospitalManagementSystem.service.patient;

import com.example.project1.hospitalManagementSystem.dto.patient.PatientRequestDto;
import com.example.project1.hospitalManagementSystem.dto.patient.PatientResponseDto;
import com.example.project1.hospitalManagementSystem.entity.Patient;
import com.example.project1.hospitalManagementSystem.repository.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final ModelMapper modelMapper;

    //create
    @Override
    @Transactional
    public PatientResponseDto createPatient(PatientRequestDto dto) {
        Patient patient = modelMapper.map(dto,Patient.class);
        Patient saved = patientRepository.save(patient);
        return modelMapper.map(saved,PatientResponseDto.class);
    }
    //Get patient By Id
    @Override
    public PatientResponseDto getPatientById(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(()->new EntityNotFoundException("patient not found with id"+id ));
        return modelMapper.map(patient,PatientResponseDto.class);
    }

    //Get All Patient
    @Override
    public Page<PatientResponseDto> getAllPatients(Pageable pageable) {
        Page<Patient> patient = patientRepository.findAll(pageable);
        return patient.map(p -> modelMapper.map(p,PatientResponseDto.class));
    }

    //Update Patient
    @Override
    @Transactional
    public PatientResponseDto updatePatient(Long id, PatientRequestDto dto) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(()->new EntityNotFoundException("patient not found with id"+id ));
        patient.setName(dto.getName());
        patient.setBirthDate(dto.getBirthDate());
        patient.setEmail(dto.getEmail());
        patient.setGender(dto.getGender());
        patient.setBlood_group(dto.getBloodGroup());
        patientRepository.save(patient);
        return modelMapper.map(patient,PatientResponseDto.class);
    }

    //Delete Patient By Id
    @Override
    @Transactional
    public void deletePatient(Long id) {
        if (!patientRepository.existsById(id)) {
            throw new EntityNotFoundException("Patient not found with id: " + id);
        }

        patientRepository.deleteById(id);
    }
}
