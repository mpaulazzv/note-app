package com.example.noteapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.noteapp.entity.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note> findByUserUsername(String username);
    Note findByIdAndUserUsername(Long id, String username);
    List<Note> findByActiveAndUserUsername(Boolean active, String username);
}
