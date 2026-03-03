package com.example.project1.hospitalManagementSystem;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HospitalManagementSystemApplication implements CommandLineRunner {


	public static void main(String[] args) {
		SpringApplication.run(HospitalManagementSystemApplication.class, args);
	}
	public void run(String... args) throws Exception{
		System.out.println("http://localhost:8080");
	}
}
