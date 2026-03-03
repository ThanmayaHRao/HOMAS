package com.example.project1.hospitalManagementSystem.controller;

import com.example.project1.hospitalManagementSystem.dto.insurance.*;
import com.example.project1.hospitalManagementSystem.service.insurance.InsuranceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/insurance")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5174")
public class InsuranceController {

    private final InsuranceService insuranceService;

    @PostMapping
    public ResponseEntity<InsuranceResponseDto> createInsurance(
            @Valid @RequestBody InsuranceRequestDto requestDto) {

        return ResponseEntity.ok(
                insuranceService.createInsurance(requestDto)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<InsuranceResponseDto> getInsuranceById(@PathVariable Long id) {

        return ResponseEntity.ok(
                insuranceService.getInsuranceById(id)
        );
    }

    @GetMapping
    public ResponseEntity<List<InsuranceResponseDto>> getAllInsurance() {

        return ResponseEntity.ok(
                insuranceService.getAllInsurance()
        );
    }

    // 🔥 ASSIGN
    @PutMapping("/{insuranceId}/assign/{patientId}")
    public ResponseEntity<InsuranceResponseDto> assignInsurance(
            @PathVariable Long insuranceId,
            @PathVariable Long patientId) {
        return ResponseEntity.ok(insuranceService.assignInsuranceToPatient(insuranceId, patientId));
    }

    // 🔥 REMOVE
    @PutMapping("/remove/{patientId}")
    public ResponseEntity<InsuranceResponseDto> removeInsurance(
            @PathVariable Long patientId) {

        return ResponseEntity.ok(
                insuranceService.disassociateInsuranceFromPatient(patientId)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInsurance(@PathVariable Long id) {

        insuranceService.deleteInsurance(id);
        return ResponseEntity.ok("Insurance deleted successfully");
    }
}