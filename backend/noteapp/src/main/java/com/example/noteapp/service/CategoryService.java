package com.example.noteapp.service;

import org.springframework.stereotype.Service;

import com.example.noteapp.dto.category.CategoryDTO;
import com.example.noteapp.entity.Category;
import com.example.noteapp.repository.CategoryRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CategoryService {

        private final CategoryRepository categoryRepository;

        public CategoryDTO createCategory(String description) {

        var category = Category.builder()
                .description(description)
                .build();
        
        categoryRepository.save(category);

        return new CategoryDTO(category.getId(), category.getDescription());
    }
}
