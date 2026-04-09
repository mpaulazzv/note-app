package com.example.noteapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.noteapp.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
