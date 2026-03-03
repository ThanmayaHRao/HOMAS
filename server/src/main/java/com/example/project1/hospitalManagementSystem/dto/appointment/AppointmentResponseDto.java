package com.example.project1.hospitalManagementSystem.dto.appointment;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AppointmentResponseDto {

    private Long id;
    private LocalDateTime appointmentTime;
    private String reason;

    private Long patientId;
    private String patientName;

    private Long doctorId;
    private String doctorName;
}
