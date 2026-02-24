package com.example.project1.hospitalManagementSystem.controller;

import com.example.project1.hospitalManagementSystem.dto.appointment.AppointmentRequestDto;
import com.example.project1.hospitalManagementSystem.dto.appointment.AppointmentResponseDto;
import com.example.project1.hospitalManagementSystem.service.appointment.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    //  Create Appointment
    @PostMapping
    public ResponseEntity<AppointmentResponseDto> createAppointment(
            @Valid @RequestBody AppointmentRequestDto dto) {

        AppointmentResponseDto response = appointmentService.createAppointment(dto);
        return ResponseEntity.ok(response);
    }

    //  Get Appointment By Id
    @GetMapping("/{id}")
    public ResponseEntity<AppointmentResponseDto> getAppointmentById(
            @PathVariable Long id) {

        return ResponseEntity.ok(appointmentService.getByIdAppointment(id));
    }

    //  Get All Appointments (Pagination Ready)
    @GetMapping
    public ResponseEntity<Page<AppointmentResponseDto>> getAllAppointments(
            Pageable pageable) {

        return ResponseEntity.ok(appointmentService.getAllAppointment(pageable));
    }

    //  Update Appointment
    @PutMapping("/{id}")
    public ResponseEntity<AppointmentResponseDto> updateAppointment(
            @PathVariable Long id,
            @Valid @RequestBody AppointmentRequestDto dto) {

        return ResponseEntity.ok(appointmentService.updateAppointment(id, dto));
    }

    //  Delete Appointment
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAppointment(
            @PathVariable Long id) {

        appointmentService.deleteAppointment(id);
        return ResponseEntity.ok("Appointment deleted successfully");
    }
}