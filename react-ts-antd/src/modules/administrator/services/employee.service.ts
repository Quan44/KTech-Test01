import type { Employee, EmployeeResponse } from '../types/employee';
import axios from 'axios';

const employeeApi = axios.create({
    baseURL: '/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Hàm get danh sách employee với phân trang
export const fetchEmployees = async (page: number, size: number = 4): Promise<EmployeeResponse> => {
  try {
    const response = await employeeApi.get(`/employees/paging?page=${page}&size=${size}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw new Error('Failed to fetch employees');
  }
};

// Hàm xóa employee
export const deleteEmployee = async (id: number): Promise<void> => {
    try {
        await employeeApi.delete(`/employees/${id}`);
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw new Error('Failed to delete employee');
    }
};

// Hàm cập nhật employee
export const updateEmployee = async (employee: Employee): Promise<Employee> => {
    try {
        const { id, ...payload } = employee;
        const response = await employeeApi.patch(`/employees/${id}`, payload);
        return response.data;
    } catch (error) {
        console.error('Error updating employee:', error);
        throw new Error('Failed to update employee');
    }
};

// Hàm tạo mới employee
export const createEmployee = async (employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Employee> => {
    try {
        const response = await employeeApi.post('/employees', employee);
        return response.data;
    } catch (error) {
        console.error('Error creating employee:', error);
        throw new Error('Failed to create employee');
    }
};
