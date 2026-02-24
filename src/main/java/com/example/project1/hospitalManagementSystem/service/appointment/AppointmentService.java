package com.example.project1.hospitalManagementSystem.service.appointment;

import com.example.project1.hospitalManagementSystem.dto.appointment.AppointmentRequestDto;
import com.example.project1.hospitalManagementSystem.dto.appointment.AppointmentResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AppointmentService {


    AppointmentResponseDto createAppointment(AppointmentRequestDto requestDto);

    AppointmentResponseDto getByIdAppointment(Long id);

    AppointmentResponseDto updateAppointment(Long id, AppointmentRequestDto requestDto);

    void deleteAppointment(Long id);

    Page<AppointmentResponseDto> getAllAppointment(Pageable pageable);
}
