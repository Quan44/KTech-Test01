package com.example.EmployeeAPI.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Cho tất cả API
                .allowedOrigins("http://localhost:5173") // Cho phép frontend của bạn
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS") // Cho phép các method
                .allowedHeaders("*") // Cho phép tất cả header
                .allowCredentials(true); // Nếu cần gửi cookie/session
    }
}