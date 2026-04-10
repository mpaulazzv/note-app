package com.example.noteapp.dto.note;

import java.util.List;

import com.example.noteapp.dto.category.CategoryDTO;

public record UpdateNoteRequest(
    String title,
    String content,
    String color,
    boolean isActive,
    List<CategoryDTO> categories
) {
}
