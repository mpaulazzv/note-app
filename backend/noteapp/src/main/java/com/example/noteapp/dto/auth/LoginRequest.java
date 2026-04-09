package com.example.noteapp.dto.auth;

public record LoginRequest (
    String username,
    String password
) {}