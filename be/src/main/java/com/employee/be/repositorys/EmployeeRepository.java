package com.employee.be.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employee.be.models.Employee;


public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    Employee findEmployeeById(Integer id);
}
