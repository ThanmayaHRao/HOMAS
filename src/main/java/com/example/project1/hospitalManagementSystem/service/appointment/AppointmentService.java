package com.example.project1.hospitalManagementSystem.service.appointment;


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
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final ModelMapper modelMapper;

    @Transactional
    public Appointment createNewAppointment(Appointment appointment , Long patientId, Long doctorId ) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(()->new EntityNotFoundException("Doctor not found" + doctorId));
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(()->new EntityNotFoundException("Patient not found" + patientId));
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        patient.getAppointment().add(appointment);//to maintain bidirectional consistency
        return appointmentRepository.save(appointment);
    }

    @Transactional
    public Appointment reAssignAppointmentToDifferentDoctor(Long doctorId, Long appointmentId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(()->new EntityNotFoundException("Doctor not found" + doctorId));
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(()->new EntityNotFoundException("Appointment not found" + appointmentId));
        appointment.setDoctor(doctor);

        return appointment;
    }
}
