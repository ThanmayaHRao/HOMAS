package com.example.project1.hospitalManagementSystem.controller;


import com.example.project1.hospitalManagementSystem.dto.patient.PatientRequestDto;
import com.example.project1.hospitalManagementSystem.dto.patient.PatientResponseDto;
import com.example.project1.hospitalManagementSystem.service.patient.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    //  Create Patient
    @PostMapping
    public ResponseEntity<PatientResponseDto> createPatient( @Valid @RequestBody PatientRequestDto dto) {

        PatientResponseDto response = patientService.createPatient(dto);
        return ResponseEntity.ok(response);
    }

    //  Get Patient By Id
    @GetMapping("/{id}")
    public ResponseEntity<PatientResponseDto> getPatientById(
            @PathVariable Long id) {

        return ResponseEntity.ok(patientService.getPatientById(id));
    }

    //  Get All Patients (Pagination Ready)
    @GetMapping
    public ResponseEntity<Page<PatientResponseDto>> getAllPatients(
            Pageable pageable) {

        return ResponseEntity.ok(patientService.getAllPatients(pageable));
    }

    //  Update Patient
    @PutMapping("/{id}")
    public ResponseEntity<PatientResponseDto> updatePatient(
            @PathVariable Long id,
            @Valid @RequestBody PatientRequestDto dto) {

        return ResponseEntity.ok(patientService.updatePatient(id, dto));
    }

    //  Delete Patient
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePatient(
            @PathVariable Long id) {

        patientService.deletePatient(id);
        return ResponseEntity.ok("Patient deleted successfully");
    }
}

