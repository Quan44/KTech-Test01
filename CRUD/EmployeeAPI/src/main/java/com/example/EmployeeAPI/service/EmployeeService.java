package com.example.EmployeeAPI.service;

import com.example.EmployeeAPI.dtos.EmployeeRequestDto;
import com.example.EmployeeAPI.dtos.EmployeeResponseDto;
import com.example.EmployeeAPI.dtos.EmployeeUpdateRequestDto;
import com.example.EmployeeAPI.dtos.PaginatedResponse;

import java.util.List;

public interface EmployeeService {
    EmployeeResponseDto create(EmployeeRequestDto request);
    List<EmployeeResponseDto> findAll();
    PaginatedResponse<EmployeeResponseDto> findAllPaginated(int page, int size);
    EmployeeResponseDto findById(Long id);
    EmployeeResponseDto update(Long id, EmployeeUpdateRequestDto request);
    void delete(Long id);
}
