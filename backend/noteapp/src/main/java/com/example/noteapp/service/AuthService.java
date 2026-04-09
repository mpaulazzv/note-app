package com.example.noteapp.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.noteapp.config.security.JwtService;
import com.example.noteapp.dto.auth.AuthResponse;
import com.example.noteapp.dto.auth.LoginRequest;
import com.example.noteapp.dto.auth.RegisterRequest;
import com.example.noteapp.exception.UserAlreadyExistsException;
import com.example.noteapp.repository.UserRepository;
import com.example.noteapp.entity.User;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register (RegisterRequest request) {
        
       
       if (userRepository.existsByUsername(request.username()))
        {
            throw new UserAlreadyExistsException("User with email " + request.username() + " already exists");
        }

        var user = User.builder()
            .name(request.name())
            .username(request.username())
            .password(passwordEncoder.encode(request.password()))
            .build();

        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);

        return new AuthResponse(jwtToken);

    }

    public AuthResponse login (LoginRequest request){

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        var user = userRepository.findByUsername(request.username());
        var jwtToken = jwtService.generateToken(user);

        return new AuthResponse(jwtToken);

    }
    
}
