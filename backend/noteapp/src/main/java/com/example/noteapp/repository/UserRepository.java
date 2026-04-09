package com.example.noteapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.noteapp.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    boolean existsByEmail(String email);
}
