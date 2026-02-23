package com.example.project1.hospitalManagementSystem.dto.department;

import lombok.Data;
import java.util.List;

@Data
public class DepartmentResponseDto {

    private Long id;
    private String name;

    private String headDoctor;

    private List<String> doctors;   // all doctors under this department
}

