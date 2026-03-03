package com.example.project1.hospitalManagementSystem.service.department;

import com.example.project1.hospitalManagementSystem.dto.department.DepartmentRequestDto;
import com.example.project1.hospitalManagementSystem.dto.department.DepartmentResponseDto;
import jakarta.validation.Valid;

import java.util.List;

public interface DepartmentService {
    DepartmentResponseDto createDepartment(@Valid DepartmentRequestDto requestDto);

    List<DepartmentResponseDto> getAllDepartments();

    DepartmentResponseDto getDepartmentById(Long id);

    DepartmentResponseDto updateDepartment(Long id, @Valid DepartmentRequestDto requestDto);

    void deleteDepartment(Long id);

    DepartmentResponseDto assignHeadDoctor(Long departmentId, Long doctorId);

    List<String> getDoctorNamesByDepartment(Long id);
}
