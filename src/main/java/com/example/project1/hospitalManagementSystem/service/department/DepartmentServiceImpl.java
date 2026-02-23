package com.example.project1.hospitalManagementSystem.service.department;

import com.example.project1.hospitalManagementSystem.dto.department.DepartmentRequestDto;
import com.example.project1.hospitalManagementSystem.dto.department.DepartmentResponseDto;
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
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final DoctorRepository doctorRepository;
    private final ModelMapper modelMapper;

    //  CREATE
    @Override
    @Transactional
    public DepartmentResponseDto createDepartment(DepartmentRequestDto dto) {

        Department department = modelMapper.map(dto, Department.class);
        Department saved = departmentRepository.save(department);

        return convertToDto(saved);
    }

    //  GET BY ID
    @Override
    public DepartmentResponseDto getDepartmentById(Long id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Department not found with id " + id));

        return convertToDto(department);
    }

    //  GET ALL
    @Override
    public List<DepartmentResponseDto> getAllDepartments() {

        return departmentRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .toList();
    }

    //  UPDATE
    @Override
    @Transactional
    public DepartmentResponseDto updateDepartment(Long id, DepartmentRequestDto dto) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Department not found with id " + id));

        department.setName(dto.getName());

        departmentRepository.save(department);

        return convertToDto(department);
    }

    //  DELETE
    @Override
    @Transactional
    public void deleteDepartment(Long id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Department not found with id " + id));

        if (!department.getDoctors().isEmpty()) {
            throw new RuntimeException("Cannot delete department with doctors assigned");
        }

        departmentRepository.delete(department);
    }

    //  ASSIGN HEAD DOCTOR
    @Override
    @Transactional
    public DepartmentResponseDto assignHeadDoctor(Long departmentId, Long doctorId) {

        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Department not found"));

        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Doctor not found"));

        department.setHeadDoctor(doctor);

        departmentRepository.save(department);

        return convertToDto(department);
    }

    //  GET DOCTOR NAMES BY DEPARTMENT
    @Override
    public List<String> getDoctorNamesByDepartment(Long departmentId) {

        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Department not found"));

        return department.getDoctors()
                .stream()
                .map(Doctor::getName)
                .toList();
    }

    //  CUSTOM DTO CONVERSION (because of headDoctor + doctor list)
    private DepartmentResponseDto convertToDto(Department department) {

        DepartmentResponseDto dto =
                modelMapper.map(department, DepartmentResponseDto.class);

        if (department.getHeadDoctor() != null) {
            dto.setHeadDoctor(department.getHeadDoctor().getName());
        }

        dto.setDoctors(
                department.getDoctors()
                        .stream()
                        .map(Doctor::getName)
                        .toList()
        );

        return dto;
    }
}