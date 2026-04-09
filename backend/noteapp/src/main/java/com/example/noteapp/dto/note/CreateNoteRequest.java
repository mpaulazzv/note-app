package com.example.noteapp.dto.note;

import java.util.List;

import com.example.noteapp.dto.category.CategoryDTO;

public record CreateNoteRequest(
    String title,
    String content,
    String color,
    List<CategoryDTO> categories
) {
}