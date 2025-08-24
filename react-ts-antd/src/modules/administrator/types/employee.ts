export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export interface Employee {
    id: number;
    fullName: string;
    email: string;
    dateOfBirth: string;
    gender: Gender;
    phoneNumber: string;
    hashPassword?: string;
    active: boolean;
    createdAt: string; 
    updatedAt: string;
}

export interface Pagination {
    currentPage: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export interface EmployeeResponse {
    data: Employee[];
    pagination: Pagination;
}