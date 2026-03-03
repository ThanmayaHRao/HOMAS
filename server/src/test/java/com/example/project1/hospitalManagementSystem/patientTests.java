package com.example.project1.hospitalManagementSystem;

import com.example.project1.hospitalManagementSystem.entity.Patient;
import com.example.project1.hospitalManagementSystem.repository.PatientRepository;
import com.example.project1.hospitalManagementSystem.service.patient.PatientServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class patientTests {
    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PatientServiceImpl patientservice;

    @Test
    public void testPatientRepository(){
      List<Patient> patientList= patientRepository.findAll();
      System.out.println(patientList);
    }

    @Test
    public void testTransactionMethods(){
       Patient patient  = patientRepository.findByName("Diya Patel");
      System.out.println(patient);
    }

}
