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
import com.example.noteapp.dto.note.UpdateNoteRequest;
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
public class NoteService {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    // ----- Service methods ----- //

    // Method to get all notes for an user
    public List<NotesDTO> getUserNotes(String username) {
        return noteRepository.findByUserUsername(username)
                .stream()
                .map(this::toNotesDTO)
                .toList();
    }

    //Method to get active/inactive notes for an user
    public List<NotesDTO> getNotesByIsActive(Boolean isActive, String username) {
        return noteRepository.findByActiveAndUserUsername(isActive, username)
                .stream()
                .map(this::toNotesDTO)
                .toList();
    }

    // Method to create a note
    @Transactional
    public NotesDTO createNote(String username, CreateNoteRequest request) {

        var user = userRepository.findByUsername(username);
        if (user == null) {
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

    // Metod to update a note, only if it belongs to the user
    @Transactional
    public NotesDTO updateNote(Long noteId, String username, UpdateNoteRequest request) {

        var note = noteRepository.findByIdAndUserUsername(noteId, username);

        if (note == null) {
            throw new EntityNotFoundException("Note not found or you don't have permission to edit it");
        }

        if (request.title() != null && !request.title().isBlank()) {
            note.setTitle(request.title());
        }
        if (request.content() != null && !request.content().isBlank()) {
            note.setContent(request.content());
        }
        if (request.color() != null && !request.color().isBlank()) {
            note.setColor(request.color());
        }
        if (request.isActive() != note.isActive()) {
            note.setActive(request.isActive());
        }
            
        if (request.categories() != null) {
            var resolvedCategories = resolveCategories(request.categories());
            updateCategories(note, resolvedCategories);
        }

        var savedNote = noteRepository.save(note);
        return toNotesDTO(savedNote);
    }

    // Method to delete a note, only if it belongs to the user
    @Transactional
    public void deleteNote(Long id, String username) {

        var note = noteRepository.findByIdAndUserUsername(id, username);
        if (note == null) {
            throw new EntityNotFoundException("Note not found or you don't have permission to delete it");
        }
        noteRepository.delete(note);
    }

    // ----- Helper methods ----- //

    // Method to create categories if they don't exist and return the set of
    // categories to be associated with the note
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

    // Method to convert Note entity to NotesDTO
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

    // Method to update the category list of a note
    private void updateCategories(Note note, Set<Category> newCategories) {

        var currentCategories = note.getCategories();

        var toRemove = currentCategories.stream()
                .filter(c -> !newCategories.contains(c))
                .collect(Collectors.toSet());

        var toAdd = newCategories.stream()
                .filter(c -> !currentCategories.contains(c))
                .collect(Collectors.toSet());

        currentCategories.removeAll(toRemove);
        currentCategories.addAll(toAdd);
    }
}