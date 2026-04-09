package com.example.noteapp.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.noteapp.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByDescriptionIn(Set<String> descriptions);

}
