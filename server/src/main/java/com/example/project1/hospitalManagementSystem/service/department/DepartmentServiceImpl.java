package com.example.project1.hospitalManagementSystem.service.department;

import com.example.project1.hospitalManagementSystem.dto.department.DepartmentRequestDto;
import com.example.project1.hospitalManagementSystem.dto.department.DepartmentResponseDto;
import com.example.project1.hospitalManagementSystem.entity.Department;
import com.example.project1.hospitalManagementSystem.entity.Doctor;
import com.example.project1.hospitalManagementSystem.exception.DuplicateResourceException;
import com.example.project1.hospitalManagementSystem.exception.InvalidOperationException;
import com.example.project1.hospitalManagementSystem.exception.ResourceNotFoundException;
import com.example.project1.hospitalManagementSystem.repository.DepartmentRepository;
import com.example.project1.hospitalManagementSystem.repository.DoctorRepository;
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
//    private final ModelMapper modelMapper;

    // CREATE
    @Override
    @Transactional
    public DepartmentResponseDto createDepartment(DepartmentRequestDto dto) {

        if (departmentRepository.existsByName(dto.getName())) {
            throw new DuplicateResourceException(
                    "Department already exists with name: " + dto.getName());
        }

        Department department = new Department();
        department.setName(dto.getName());

        Department saved = departmentRepository.save(department);

        return convertToDto(saved);
    }

    // GET BY ID
    @Override
    public DepartmentResponseDto getDepartmentById(Long id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found with id " + id));

        return convertToDto(department);
    }

    // GET ALL
    @Override
    public List<DepartmentResponseDto> getAllDepartments() {

        return departmentRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .toList();
    }

    // UPDATE
    @Override
    @Transactional
    public DepartmentResponseDto updateDepartment(Long id, DepartmentRequestDto dto) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found with id " + id));

        if (!department.getName().equals(dto.getName()) &&
                departmentRepository.existsByName(dto.getName())) {

            throw new DuplicateResourceException(
                    "Department name already exists: " + dto.getName());
        }

        department.setName(dto.getName());

        return convertToDto(departmentRepository.save(department));
    }

    // DELETE
    @Override
    @Transactional
    public void deleteDepartment(Long id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found with id " + id));

        if (!department.getDoctors().isEmpty()) {
            throw new InvalidOperationException(
                    "Cannot delete department with doctors assigned");
        }

        departmentRepository.delete(department);
    }

    // ASSIGN HEAD DOCTOR
    @Override
    @Transactional
    public DepartmentResponseDto assignHeadDoctor(Long departmentId, Long doctorId) {

        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found"));

        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Doctor not found"));

        if (!doctor.getDepartment().getId().equals(departmentId)) {
            throw new InvalidOperationException(
                    "Doctor does not belong to this department");
        }

        department.setHeadDoctor(doctor);

        return convertToDto(departmentRepository.save(department));
    }

    // GET DOCTOR NAMES
    @Override
    public List<String> getDoctorNamesByDepartment(Long departmentId) {

        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found"));

        return department.getDoctors()
                .stream()
                .map(Doctor::getName)
                .toList();
    }

    // DTO Conversion
    private DepartmentResponseDto convertToDto(Department department) {

        DepartmentResponseDto dto = new DepartmentResponseDto();

        dto.setId(department.getId());
        dto.setName(department.getName());

        // Head Doctor
        if (department.getHeadDoctor() != null) {
            dto.setHeadDoctor(department.getHeadDoctor().getName());
        } else {
            dto.setHeadDoctor(null);
        }

        // Doctor List
        if (department.getDoctors() != null) {
            dto.setDoctors(
                    department.getDoctors()
                            .stream()
                            .map(Doctor::getName)
                            .toList()
            );
        } else {
            dto.setDoctors(List.of());
        }

        return dto;
    }
}