package com.employee.be.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee.be.models.Employee;
import com.employee.be.repositorys.EmployeeRepository;
@Service
public class EmployeeServiceImpl implements EmployeeService{
    @Autowired
    EmployeeRepository EmployeeRepository;
    @Override
    public String addEmployee(Employee employee) {
        EmployeeRepository.save(employee);
        return "Succes Add Employee";
    }
    @Override
    public String deleteEmployee(Integer id){
        EmployeeRepository.deleteById(id);
        return "Succes Delete Employee";
    }
    @Override
    public List<Employee> getAll(){
        return EmployeeRepository.findAll();
    }
    @Override
    public String editEmployee(Integer id, Employee employee){
        Employee employee2 = EmployeeRepository.findEmployeeById(id);
        employee2.setName(employee.getName());
        employee2.setEmail(employee.getEmail());
        employee2.setJabatan(employee.getJabatan());
        employee2.setDivisi(employee.getDivisi());
        employee2.setGaji(employee.getGaji());
        EmployeeRepository.save(employee2);
        return "Succes Edit Employee";
    }
}
