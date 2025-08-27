package com.example.EmployeeAPI.controller;

import com.example.EmployeeAPI.dtos.EmployeeRequestDto;
import com.example.EmployeeAPI.dtos.EmployeeResponseDto;
import com.example.EmployeeAPI.dtos.EmployeeUpdateRequestDto;
import com.example.EmployeeAPI.dtos.PaginatedResponse;
import com.example.EmployeeAPI.exception.ApiResponse;
import com.example.EmployeeAPI.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/employees")
@RequiredArgsConstructor
public class EmployeeController {
    private final EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<ApiResponse<EmployeeResponseDto>> create(@Valid @RequestBody EmployeeRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Create employee successfully", employeeService.create(request)));
    }

    @GetMapping
    public ApiResponse<List<EmployeeResponseDto>> findAll() {
        return ApiResponse.ok("Find all employees", employeeService.findAll());
    }

    @GetMapping("/paging")
    public ApiResponse<PaginatedResponse<EmployeeResponseDto>> findAllPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size) {
        return ApiResponse.ok("Find all employees with pagination", 
                employeeService.findAllPaginated(page, size));
    }

    @GetMapping("/{id}")
    public ApiResponse<EmployeeResponseDto> findById(@PathVariable Long id) {
        return ApiResponse.ok("Find employee by id", employeeService.findById(id));
    }

    @PatchMapping("/{id}")
    public ApiResponse<EmployeeResponseDto> update(@PathVariable Long id, @Valid @RequestBody EmployeeUpdateRequestDto request) {
        return ApiResponse.ok("Update employee successfully", employeeService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        employeeService.delete(id);
        return ApiResponse.ok("Delete employee successfully", null);
    }
}
