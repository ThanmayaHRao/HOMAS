package com.example.project1.hospitalManagementSystem.service.appointment;

import com.example.project1.hospitalManagementSystem.dto.appointment.AppointmentRequestDto;
import com.example.project1.hospitalManagementSystem.dto.appointment.AppointmentResponseDto;
import com.example.project1.hospitalManagementSystem.entity.Appointment;
import com.example.project1.hospitalManagementSystem.entity.Doctor;
import com.example.project1.hospitalManagementSystem.entity.Patient;
import com.example.project1.hospitalManagementSystem.repository.AppointmentRepository;
import com.example.project1.hospitalManagementSystem.repository.DoctorRepository;
import com.example.project1.hospitalManagementSystem.repository.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final ModelMapper modelMapper;

    // ✅ CREATE
    @Override
    @Transactional
    public AppointmentResponseDto createAppointment(AppointmentRequestDto requestDto) {

        // 1️⃣ Validate future time
        if (requestDto.getAppointmentTime().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Appointment time must be in the future");
        }

        // 2️⃣ Fetch doctor & patient
        Doctor doctor = doctorRepository.findById(requestDto.getDoctorId())
                .orElseThrow(() -> new EntityNotFoundException("Doctor not found"));

        Patient patient = patientRepository.findById(requestDto.getPatientId())
                .orElseThrow(() -> new EntityNotFoundException("Patient not found"));

        // 3️⃣ Prevent double booking
        boolean alreadyBooked =
                appointmentRepository.existsByDoctor_IdAndAppointmentTime(
                        doctor.getId(),
                        requestDto.getAppointmentTime()
                );

        if (alreadyBooked) {
            throw new IllegalStateException("Doctor is already booked at this time");
        }

        // 4️⃣ Manual Mapping (SAFE WAY)
        Appointment appointment = new Appointment();
        appointment.setAppointmentTime(requestDto.getAppointmentTime());
        appointment.setReason(requestDto.getReason());
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);

        Appointment saved = appointmentRepository.save(appointment);

        return mapToResponse(saved);
    }

    // ✅ GET BY ID
    @Override
    public AppointmentResponseDto getByIdAppointment(Long id) {

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found"));

        return mapToResponse(appointment);
    }

    // ✅ UPDATE
    @Override
    @Transactional
    public AppointmentResponseDto updateAppointment(Long id, AppointmentRequestDto requestDto) {

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found"));

        if (requestDto.getAppointmentTime().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Appointment time must be in the future");
        }

        Doctor doctor = doctorRepository.findById(requestDto.getDoctorId())
                .orElseThrow(() -> new EntityNotFoundException("Doctor not found"));

        Patient patient = patientRepository.findById(requestDto.getPatientId())
                .orElseThrow(() -> new EntityNotFoundException("Patient not found"));

        // Prevent double booking (excluding current appointment)
        boolean alreadyBooked =
                appointmentRepository.existsByDoctor_IdAndAppointmentTimeAndIdNot(
                        doctor.getId(),
                        requestDto.getAppointmentTime(),
                        id
                );

        if (alreadyBooked) {
            throw new IllegalStateException("Doctor is already booked at this time");
        }

        appointment.setAppointmentTime(requestDto.getAppointmentTime());
        appointment.setReason(requestDto.getReason());
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);

        Appointment updated = appointmentRepository.save(appointment);

        return mapToResponse(updated);
    }

    // ✅ DELETE
    @Override
    public void deleteAppointment(Long id) {

        if (!appointmentRepository.existsById(id)) {
            throw new EntityNotFoundException("Appointment not found");
        }

        appointmentRepository.deleteById(id);
    }

    // ✅ PAGINATION
    @Override
    public Page<AppointmentResponseDto> getAllAppointment(Pageable pageable) {

        return appointmentRepository.findAll(pageable)
                .map(this::mapToResponse);
    }

    // 🔁 ENTITY → RESPONSE DTO
    private AppointmentResponseDto mapToResponse(Appointment appointment) {

        AppointmentResponseDto dto =
                modelMapper.map(appointment, AppointmentResponseDto.class);

        dto.setDoctorId(appointment.getDoctor().getId());
        dto.setDoctorName(appointment.getDoctor().getName());

        dto.setPatientId(appointment.getPatient().getId());
        dto.setPatientName(appointment.getPatient().getName());

        return dto;
    }
}