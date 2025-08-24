package com.example.EmployeeAPI.dtos;

import com.example.EmployeeAPI.enums.Gender;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeRequestDto {
    @NotNull(message = "Full name cannot be null")
    @Size(min = 4, max = 160, message = "Full name must be between 4 and 160 characters")
    private String fullName;

    @NotNull(message = "Email cannot be null")
    @Email(message = "Email should be valid")
    private String email;

    private LocalDate dateOfBirth;

    private Gender gender;

    @Pattern(regexp = "^\\d{10}$", message = "Phone must be exactly 10 digits")
    private String phoneNumber;

    @NotNull
    private Boolean active;

    @NotBlank(message = "Password cannot be blank")
    private String hashPassword;
}
