package com.example.noteapp.dto.note;

import java.time.LocalDateTime;
import java.util.List;

import com.example.noteapp.dto.category.CategoryDTO;

public record NotesDTO(
    String title,
    String content,
    String color,
    Boolean isArchived,
    LocalDateTime updatedAt,
    List<CategoryDTO> categories
) {
}
