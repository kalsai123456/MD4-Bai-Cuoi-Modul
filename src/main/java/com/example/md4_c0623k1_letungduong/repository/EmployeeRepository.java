package com.example.md4_c0623k1_letungduong.repository;

import com.example.md4_c0623k1_letungduong.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {
    Iterable<Employee> findAllByDepartmentId(Long id);
    @Query(value = "select * from employee order by age DESC", nativeQuery = true)
    Iterable<Employee> sortIncreasing();

    @Query(value = "select * from employee order by age ASC", nativeQuery = true)
    Iterable<Employee> sortDecreasing();
}
