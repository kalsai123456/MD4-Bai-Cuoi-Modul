package com.example.md4_c0623k1_letungduong.controller;

import com.example.md4_c0623k1_letungduong.model.Department;
import com.example.md4_c0623k1_letungduong.service.IDepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/departments")
public class DepartmentController {
    @Autowired
    private IDepartmentService iDepartmentService;

    @GetMapping
    public ResponseEntity<Iterable<Department>> findAll() {
        List<Department> departmentList = (List<Department>) iDepartmentService.findAll();
        if (departmentList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(departmentList, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Department> findDepartmentById(@PathVariable Long id) {
        Optional<Department> departmentOptional = iDepartmentService.findById(id);
        if (!departmentOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(departmentOptional.get(), HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable Long id, @RequestBody Department department) {
        Optional<Department> departmentOptional = iDepartmentService.findById(id);
        if (!departmentOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        department.setId(id);
        iDepartmentService.save(department);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Department> saveDepartment(@RequestBody Department department) {
        iDepartmentService.save(department);
        return new ResponseEntity<>(iDepartmentService.save(department), HttpStatus.CREATED);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Department> deleteDepartment(@PathVariable Long id) {
        Optional<Department> departmentOptional = iDepartmentService.findById(id);
        if (!departmentOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        iDepartmentService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
