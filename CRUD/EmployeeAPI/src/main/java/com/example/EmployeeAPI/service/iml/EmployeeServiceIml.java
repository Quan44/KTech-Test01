package com.example.EmployeeAPI.service.iml;

import com.example.EmployeeAPI.dtos.EmployeeRequestDto;
import com.example.EmployeeAPI.dtos.EmployeeResponseDto;
import com.example.EmployeeAPI.dtos.EmployeeUpdateRequestDto;
import com.example.EmployeeAPI.entities.EmployeeEntity;
import com.example.EmployeeAPI.repository.EmployeeRepository;
import com.example.EmployeeAPI.service.EmployeeService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeServiceIml implements EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public EmployeeResponseDto create(EmployeeRequestDto request) {
        if (employeeRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        EmployeeEntity employee = EmployeeEntity.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .dateOfBirth(request.getDateOfBirth())
                .gender(request.getGender())
                .phoneNumber(request.getPhoneNumber())
                .active(request.getActive())
                .hashedPassword(passwordEncoder.encode(request.getHashPassword()))
                .build();
        return toResponse(employeeRepository.save(employee));
    }

    @Override
    @Transactional
    public List<EmployeeResponseDto> findAll() {
        return employeeRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public EmployeeResponseDto findById(Long id) {
        EmployeeEntity employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
        return toResponse(employee);
    }

    @Override
    public EmployeeResponseDto update(Long id, EmployeeUpdateRequestDto request) {
        EmployeeEntity e = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
        e.setFullName(request.getFullName());
        e.setDateOfBirth(request.getDateOfBirth());
        e.setGender(request.getGender());
        e.setPhoneNumber(request.getPhoneNumber());
        e.setActive(request.getActive());
        e.setHashedPassword(request.getHashPassword());

        return toResponse(e);
    }

    @Override
    public void delete(Long id) {
        if(!employeeRepository.existsById(id)) {
            throw new RuntimeException("Employee not found with id: " + id);
        }
        employeeRepository.deleteById(id);
    }

    private EmployeeResponseDto toResponse(EmployeeEntity save) {
        return new EmployeeResponseDto(
                save.getId(),
                save.getFullName(),
                save.getEmail(),
                save.getDateOfBirth(),
                save.getGender(),
                save.getPhoneNumber(),
                save.getActive(),
                save.getCreatedAt(),
                save.getUpdatedAt()
        );
    }
}
