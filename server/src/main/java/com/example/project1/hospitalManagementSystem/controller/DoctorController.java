package com.example.project1.hospitalManagementSystem.controller;

import com.example.project1.hospitalManagementSystem.dto.doctor.DoctorRequestDto;
import com.example.project1.hospitalManagementSystem.dto.doctor.DoctorResponseDto;
import com.example.project1.hospitalManagementSystem.service.doctor.DoctorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    // CREATE
    @PostMapping
    public DoctorResponseDto createDoctor(
            @Valid @RequestBody DoctorRequestDto dto) {
        return doctorService.createDoctor(dto);
    }

    // GET ALL
    @GetMapping
    public List<DoctorResponseDto> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public DoctorResponseDto getDoctorById(@PathVariable Long id) {
        return doctorService.getDoctorById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public DoctorResponseDto updateDoctor(
            @PathVariable Long id,
            @Valid @RequestBody DoctorRequestDto dto) {
        return doctorService.updateDoctor(id, dto);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
    }

    // ASSIGN TO DEPARTMENT
    @PutMapping("/{doctorId}/department/{departmentId}")
    public DoctorResponseDto assignDoctorToDepartment(
            @PathVariable Long doctorId,
            @PathVariable Long departmentId) {
        return doctorService.assignDoctorToDepartment(doctorId, departmentId);
    }

    // LIST ONLY NAMES
    @GetMapping("/names")
    public List<String> getDoctorNames() {
        return doctorService.getAllDoctorNames();
    }
}