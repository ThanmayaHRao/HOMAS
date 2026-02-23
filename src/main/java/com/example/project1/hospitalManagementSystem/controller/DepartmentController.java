package com.example.project1.hospitalManagementSystem.controller;

import com.example.project1.hospitalManagementSystem.dto.department.DepartmentRequestDto;
import com.example.project1.hospitalManagementSystem.dto.department.DepartmentResponseDto;
import com.example.project1.hospitalManagementSystem.service.department.DepartmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService departmentService;

    // CREATE
    @PostMapping
    public DepartmentResponseDto createDepartment(
            @Valid @RequestBody DepartmentRequestDto requestDto) {
        return departmentService.createDepartment(requestDto);
    }

    // GET ALL
    @GetMapping
    public List<DepartmentResponseDto> getAllDepartments() {
        return departmentService.getAllDepartments();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public DepartmentResponseDto getDepartmentById(@PathVariable Long id) {
        return departmentService.getDepartmentById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public DepartmentResponseDto updateDepartment(
            @PathVariable Long id,
            @Valid @RequestBody DepartmentRequestDto requestDto) {
        return departmentService.updateDepartment(id, requestDto);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteDepartment(@PathVariable Long id) {
        departmentService.deleteDepartment(id);
    }

    // ASSIGN HEAD DOCTOR
    @PutMapping("/{departmentId}/head/{doctorId}")
    public DepartmentResponseDto assignHeadDoctor(
            @PathVariable Long departmentId,
            @PathVariable Long doctorId) {
        return departmentService.assignHeadDoctor(departmentId, doctorId);
    }
    // GET DOCTOR NAMES BY DEPARTMENT
    @GetMapping("/{id}/doctors")
    public List<String> getDoctorNamesByDepartment(@PathVariable Long id) {
        return departmentService.getDoctorNamesByDepartment(id);
    }
}
