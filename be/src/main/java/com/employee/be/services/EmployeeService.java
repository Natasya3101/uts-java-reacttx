package com.employee.be.services;

import java.util.List;

import com.employee.be.models.Employee;

public interface EmployeeService {
    String addEmployee(Employee employee);
    String deleteEmployee(Integer id);
    List<Employee> getAll();
    String editEmployee(Integer id, Employee employee);
}
