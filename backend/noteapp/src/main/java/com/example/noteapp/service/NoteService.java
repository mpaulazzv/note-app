package com.example.noteapp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.noteapp.dto.category.CategoryDTO;
import com.example.noteapp.dto.note.NotesDTO;
import com.example.noteapp.repository.NoteRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;

    public List<NotesDTO> getUserNotes(String username) {

        var notes = noteRepository.findByUserUsername(username);

        return notes.stream().map(note -> {

            List<CategoryDTO> categoryDTOs = note.getCategories().stream()
                    .map(category -> new CategoryDTO(category.getDescription()))
                    .collect(Collectors.toList());

            return new NotesDTO(
                    note.getTitle(),
                    note.getContent(),
                    note.getColor(),
                    note.isActive(),
                    note.getUpdatedAt(),
                    categoryDTOs);
        }).toList();

    }

    

}
