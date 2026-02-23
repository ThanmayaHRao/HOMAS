package com.example.project1.hospitalManagementSystem.dto.patient;

import com.example.project1.hospitalManagementSystem.entity.type.BloodGroup;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientResponseDto {
    private Long id;
    private String name;
    private String email;
    private String gender;
    private BloodGroup bloodGroup;
    private LocalDateTime createdAt;
}
