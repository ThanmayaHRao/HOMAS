package com.example.project1.hospitalManagementSystem.service.doctor;

import com.example.project1.hospitalManagementSystem.dto.doctor.DoctorRequestDto;
import com.example.project1.hospitalManagementSystem.dto.doctor.DoctorResponseDto;

import java.util.List;

public interface DoctorService  {

    DoctorResponseDto createDoctor(DoctorRequestDto dto);

    DoctorResponseDto getDoctorById(Long id);

    List<DoctorResponseDto> getAllDoctors();

    DoctorResponseDto updateDoctor(Long id, DoctorRequestDto dto);

    void deleteDoctor(Long id);

    DoctorResponseDto assignDoctorToDepartment(Long doctorId, Long departmentId);

    List<String> getAllDoctorNames();
}