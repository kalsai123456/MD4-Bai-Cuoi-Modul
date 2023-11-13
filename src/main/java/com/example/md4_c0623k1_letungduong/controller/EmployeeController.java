package com.example.md4_c0623k1_letungduong.controller;

import com.example.md4_c0623k1_letungduong.model.Employee;
import com.example.md4_c0623k1_letungduong.service.EmployeeService;
import com.example.md4_c0623k1_letungduong.service.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin("*")
@RestController
@RequestMapping("/employees")
public class EmployeeController {
    @Autowired
    IEmployeeService iEmployeeService;
    @Autowired
    EmployeeService employeeService;
    @GetMapping
    public ResponseEntity<Iterable<Employee>> findAll() {
        List<Employee> employeeList = (List<Employee>) iEmployeeService.findAll();
        if (employeeList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(employeeList, HttpStatus.OK);
    }
    @GetMapping("/department/{id}")
    public ResponseEntity<Iterable<Employee>> findAllByDepartment(@PathVariable Long id) {
        List<Employee> employeeList = (List<Employee>) employeeService.findAllByDepartment(id);
        if (employeeList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(employeeList, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Employee> findEmployeeById(@PathVariable Long id) {
        Optional<Employee> employeeOptional = iEmployeeService.findById(id);
        if (!employeeOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(employeeOptional.get(), HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employee) {
        Optional<Employee> employeeOptional = iEmployeeService.findById(id);
        if (!employeeOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        employee.setId(id);
        iEmployeeService.save(employee);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Employee> saveEmployee(@RequestBody Employee employee) {
        iEmployeeService.save(employee);
        return new ResponseEntity<>(iEmployeeService.save(employee), HttpStatus.CREATED);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Employee> deleteEmployee(@PathVariable Long id) {
        Optional<Employee> employeeOptional = iEmployeeService.findById(id);
        if (!employeeOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        iEmployeeService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/sortI")
    public ResponseEntity<Iterable<Employee>> sortI() {
        List<Employee> employeeList = (List<Employee>) employeeService.sortI();
        if (employeeList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(employeeList, HttpStatus.OK);
    }
    @GetMapping("/sortD")
    public ResponseEntity<Iterable<Employee>> sortD() {
        List<Employee> employeeList = (List<Employee>) employeeService.sortD();
        if (employeeList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(employeeList, HttpStatus.OK);
    }
}
