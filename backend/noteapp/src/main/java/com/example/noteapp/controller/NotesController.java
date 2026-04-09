package com.example.noteapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.noteapp.dto.note.CreateNoteRequest;
import com.example.noteapp.dto.note.NotesDTO;
import com.example.noteapp.service.NoteService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/notes")
@AllArgsConstructor
public class NotesController {

    private final NoteService noteService;

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
     
}
