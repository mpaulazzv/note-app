package com.example.noteapp.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.noteapp.dto.category.CategoryDTO;
import com.example.noteapp.dto.note.CreateNoteRequest;
import com.example.noteapp.dto.note.NotesDTO;
import com.example.noteapp.entity.Category;
import com.example.noteapp.entity.Note;
import com.example.noteapp.repository.CategoryRepository;
import com.example.noteapp.repository.NoteRepository;
import com.example.noteapp.repository.UserRepository;

import io.jsonwebtoken.lang.Collections;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NoteCrudService {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    // ----- Service methods ----- //

    //Method to get all notes for an user
    public List<NotesDTO> getUserNotes(String username) {
        return noteRepository.findByUserUsername(username)
                .stream()
                .map(this::toNotesDTO)
                .toList();
    }

    //Method to create a note
    public NotesDTO createNote(String username, CreateNoteRequest request) {
        
        var user = userRepository.findByUsername(username);
        if (user == null){
            throw new EntityNotFoundException("User not found");
        }       

        var categories = resolveCategories(request.categories());

        var note = Note.builder()
                .title(request.title())
                .content(request.content())
                .color(request.color())
                .active(true)
                .categories(categories)
                .user(user)
                .build();

        var savedNote = noteRepository.save(note);
        return toNotesDTO(savedNote);
    }

    @Transactional
    public void deleteNote (Long id, String username){

        var note = noteRepository.findByIdAndUserUsername(id, username);
        if (note == null){
            throw new EntityNotFoundException("Note not found or you don't have permission to delete it");
        }
        noteRepository.delete(note);
    }

    // ----- Helper methods ----- //

    //Method to create categories if they don't exist and return the set of categories to be associated with the note
    private Set<Category> resolveCategories(List<CategoryDTO> categoryDTOs) {
        if (categoryDTOs == null || categoryDTOs.isEmpty()) {
            return Collections.emptySet();
        }

        var descriptions = categoryDTOs.stream()
                .map(CategoryDTO::category)
                .collect(Collectors.toSet());

        var existingCategories = categoryRepository.findByDescriptionIn(descriptions)
                .stream()
                .collect(Collectors.toMap(Category::getDescription, Function.identity()));

        var newCategories = descriptions.stream()
                .filter(desc -> !existingCategories.containsKey(desc))
                .map(desc -> Category.builder().description(desc).build())
                .toList();

        if (!newCategories.isEmpty()) {
            categoryRepository.saveAll(newCategories)
                    .forEach(saved -> existingCategories.put(saved.getDescription(), saved));
        }

        return new HashSet<>(existingCategories.values());
    }

    //Method to convert Note entity to NotesDTO
    private NotesDTO toNotesDTO(Note note) {
        var categoryDTOs = note.getCategories().stream()
                .map(c -> new CategoryDTO(c.getId(), c.getDescription()))
                .toList();

        return new NotesDTO(
                note.getId(),
                note.getTitle(),
                note.getContent(),
                note.getColor(),
                note.isActive(),
                note.getUpdatedAt(),
                categoryDTOs);
    }
}