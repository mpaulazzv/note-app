package com.example.noteapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.noteapp.dto.note.CreateNoteRequest;
import com.example.noteapp.dto.note.NotesDTO;
import com.example.noteapp.service.NoteCrudService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/notes")
@AllArgsConstructor
public class NotesController {

    private final NoteCrudService noteService;

    @GetMapping("/")
    public ResponseEntity<List<NotesDTO>> getUserNotes(Authentication authentication) {
        String userName = authentication.getName();
        return ResponseEntity.ok(noteService.getUserNotes(userName));
    }

    @PostMapping("/create")
    public ResponseEntity<NotesDTO> createNote(Authentication authentication, @RequestBody CreateNoteRequest request) {
        String userName = authentication.getName();
        return ResponseEntity.ok(noteService.createNote(userName, request));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id, Authentication authentication) {
        String userName = authentication.getName();
        noteService.deleteNote(id, userName);
        return ResponseEntity.noContent().build();
    }
     
}
