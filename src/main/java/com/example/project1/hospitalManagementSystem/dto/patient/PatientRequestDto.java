package com.example.project1.hospitalManagementSystem.dto.patient;

import com.example.project1.hospitalManagementSystem.entity.type.BloodGroup;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientRequestDto {
        @NotBlank(message = "Name cannot be empty")
        private String name;

        @Email(message = "Invalid email format")
        @NotBlank(message = "Email is required")
        private String email;

        @NotNull(message = "Birthdate is required")
        private LocalDate birthDate;

        @NotBlank(message = "Gender is required")
        private String gender;

        @NotNull(message = "Blood group is required")
        private BloodGroup bloodGroup;

}
