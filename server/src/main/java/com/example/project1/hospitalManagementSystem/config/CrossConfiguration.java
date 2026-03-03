package com.example.project1.hospitalManagementSystem.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CrossConfiguration implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry.addMapping("/**")
                .allowedOriginPatterns("*")   // allow all origins (dev mode)
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(false);     // IMPORTANT
    }
}