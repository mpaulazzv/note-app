package com.example.noteapp.dto.exception;

import java.time.LocalDateTime;

public record ExceptionResponse(
    LocalDateTime timestamp,
    String message,
    String details,
    int statusCode
) {}
