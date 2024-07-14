package com.employee.be.controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employee.be.models.Employee;
import com.employee.be.services.EmployeeService;

@RequestMapping("/api")
@RestController
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;

    @PostMapping("/add")
    public String addEmployee(@RequestBody Employee employee){
        return employeeService.addEmployee(employee);
    }
    @DeleteMapping("{id}")
    public String deleteProduct(@PathVariable Integer id){
        return employeeService.deleteEmployee(id);
    }
    @GetMapping("/getAll")
    public List<Employee> getAll(){
        return employeeService.getAll();
    }
    @PutMapping("edit/{id}")
    public String editEmployee(@PathVariable Integer id, @RequestBody Employee employee){
        return employeeService.editEmployee(id, employee);
    }
}
