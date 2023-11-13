package com.example.md4_c0623k1_letungduong.service;

import java.util.Optional;

public interface IGeneralService<T> {
    Iterable<T> findAll();

    Optional<T> findById(Long id);

    T save(T t);

    void delete(Long id);
}
