package com.example.noteapp.dto.auth;

public record RegisterRequest (
    String name,
    String username,
    String password
) {}
