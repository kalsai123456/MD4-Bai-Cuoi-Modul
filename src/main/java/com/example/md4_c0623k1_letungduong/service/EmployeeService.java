package com.example.md4_c0623k1_letungduong.service;

import com.example.md4_c0623k1_letungduong.model.Employee;
import com.example.md4_c0623k1_letungduong.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class EmployeeService implements IEmployeeService{
    @Autowired
    EmployeeRepository employeeRepository;
    @Override
    public Iterable<Employee> findAll() {
        return employeeRepository.findAll();
    }
    public Iterable<Employee> findAllByDepartment(Long id) {
        return employeeRepository.findAllByDepartmentId(id);
    }

    @Override
    public Optional<Employee> findById(Long id) {
        return employeeRepository.findById(id);
    }

    @Override
    public Employee save(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public void delete(Long id) {
        employeeRepository.deleteById(id);
    }
    public Iterable<Employee> sortI() {
        return employeeRepository.sortIncreasing();
    }
    public Iterable<Employee> sortD() {
        return employeeRepository.sortDecreasing();
    }
}
