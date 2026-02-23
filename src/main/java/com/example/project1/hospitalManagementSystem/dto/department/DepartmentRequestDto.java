package com.example.project1.hospitalManagementSystem.dto.department;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class DepartmentRequestDto {

    @NotBlank(message = "Department name is required")
    @Size(min = 3, max = 100, message = "Department name must be between 3 and 100 characters")
    private String name;

}