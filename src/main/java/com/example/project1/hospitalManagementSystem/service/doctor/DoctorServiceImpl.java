package com.example.project1.hospitalManagementSystem.service.doctor;

import com.example.project1.hospitalManagementSystem.dto.doctor.DoctorRequestDto;
import com.example.project1.hospitalManagementSystem.dto.doctor.DoctorResponseDto;
import com.example.project1.hospitalManagementSystem.entity.Department;
import com.example.project1.hospitalManagementSystem.entity.Doctor;
import com.example.project1.hospitalManagementSystem.repository.DepartmentRepository;
import com.example.project1.hospitalManagementSystem.repository.DoctorRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;
    private final DepartmentRepository departmentRepository;
    private final ModelMapper modelMapper;

    // CREATE
    @Override
    @Transactional
    public DoctorResponseDto createDoctor(DoctorRequestDto dto) {

        Doctor doctor = new Doctor();
        doctor.setName(dto.getName());
        doctor.setEmail(dto.getEmail());
        doctor.setSpecialization(dto.getSpecialization());

        if (dto.getDepartmentId() != null) {
            Department department = departmentRepository.findById(dto.getDepartmentId())
                    .orElseThrow(() -> new EntityNotFoundException("Department not found"));
            doctor.setDepartment(department);
        }

        Doctor saved = doctorRepository.save(doctor);

        return convertToDto(saved);
    }

    // GET BY ID
    @Override
    public DoctorResponseDto getDoctorById(Long id) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Doctor not found"));

        return convertToDto(doctor);
    }

    // GET ALL
    @Override
    public List<DoctorResponseDto> getAllDoctors() {

        return doctorRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .toList();
    }

    // UPDATE
    @Override
    @Transactional
    public DoctorResponseDto updateDoctor(Long id, DoctorRequestDto dto) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Doctor not found"));

        doctor.setName(dto.getName());
        doctor.setEmail(dto.getEmail());
        doctor.setSpecialization(dto.getSpecialization());

        if (dto.getDepartmentId() != null) {
            Department department = departmentRepository.findById(dto.getDepartmentId())
                    .orElseThrow(() -> new EntityNotFoundException("Department not found"));
            doctor.setDepartment(department);
        }

        return convertToDto(doctor);
    }

    // DELETE
    @Override
    @Transactional
    public void deleteDoctor(Long id) {

        if (!doctorRepository.existsById(id)) {
            throw new EntityNotFoundException("Doctor not found");
        }

        doctorRepository.deleteById(id);
    }

    // ASSIGN DOCTOR TO DEPARTMENT
    @Override
    @Transactional
    public DoctorResponseDto assignDoctorToDepartment(Long doctorId, Long departmentId) {

        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new EntityNotFoundException("Doctor not found"));

        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new EntityNotFoundException("Department not found"));

        doctor.setDepartment(department);

        return convertToDto(doctor);
    }

    // GET ALL DOCTOR NAMES ONLY
    @Override
    public List<String> getAllDoctorNames() {

        return doctorRepository.findAll()
                .stream()
                .map(Doctor::getName)
                .toList();
    }

    // DTO CONVERTER
    private DoctorResponseDto convertToDto(Doctor doctor) {

        DoctorResponseDto dto = modelMapper.map(doctor, DoctorResponseDto.class);

        if (doctor.getDepartment() != null) {
            dto.setDepartmentName(doctor.getDepartment().getName());
        }

        return dto;
    }
}