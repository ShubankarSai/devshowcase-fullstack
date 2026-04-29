package com.devshowcase.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.devshowcase.backend.config.JwtUtil;
import com.devshowcase.backend.dto.LoginRequest;
import com.devshowcase.backend.dto.LoginResponse;
import com.devshowcase.backend.dto.UserRequest;
import com.devshowcase.backend.dto.UserResponse;
import com.devshowcase.backend.entity.User;
import com.devshowcase.backend.exception.ResourceNotFoundException;
import com.devshowcase.backend.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // CREATE USER
    public UserResponse saveUser(UserRequest request) {

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setBio(request.getBio());
        user.setGithubLink(request.getGithubLink());

        User savedUser = userRepository.save(user);

        UserResponse response = new UserResponse();
        response.setId(savedUser.getId());
        response.setName(savedUser.getName());
        response.setEmail(savedUser.getEmail());
        response.setBio(savedUser.getBio());
        response.setGithubLink(savedUser.getGithubLink());

        return response;
    }

    // GET ALL USERS
    public List<UserResponse> getAllUsers() {

        List<User> users = userRepository.findAll();

        return users.stream().map(user -> {
            UserResponse res = new UserResponse();
            res.setId(user.getId());
            res.setName(user.getName());
            res.setEmail(user.getEmail());
            res.setBio(user.getBio());
            res.setGithubLink(user.getGithubLink());
            return res;
        }).toList();
    }

    //LOGIN USER
    public LoginResponse loginUser(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        LoginResponse response = new LoginResponse();
        response.setMessage("Login successful");
        response.setToken(token);

        return response;
    }

    //GET LOGGED-IN USER EMAIL
    public String getLoggedInUserEmail() {

        Object principal = SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        //SAFETY FIX
        if (principal instanceof String) {
            return (String) principal;
        }

        throw new RuntimeException("Invalid authentication principal");
    }

    //GET LOGGED-IN USER
    public User getLoggedInUser() {

        String email = getLoggedInUserEmail();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
    
    public UserResponse updateUser(UserRequest request) {

        if (request.getEmail() == null) {
            throw new RuntimeException("Email is required");
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(request.getName());

        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        userRepository.save(user);

        return new UserResponse(user.getId(), user.getName(), user.getEmail());
    }
}