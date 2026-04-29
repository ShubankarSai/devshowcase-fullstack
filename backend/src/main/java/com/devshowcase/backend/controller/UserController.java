package com.devshowcase.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.devshowcase.backend.dto.LoginRequest;
import com.devshowcase.backend.dto.LoginResponse;
import com.devshowcase.backend.dto.UserRequest;
import com.devshowcase.backend.dto.UserResponse;
import com.devshowcase.backend.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@PostMapping
	public UserResponse createUser(@Valid @RequestBody UserRequest request) {
		return userService.saveUser(request);
	}
	
	@GetMapping
	public List<UserResponse> getAllUsers(){
		return userService.getAllUsers();
	}
	
	@PostMapping("/login")
	public LoginResponse login(@RequestBody LoginRequest request) {
		return userService.loginUser(request);
	}
	
	@PutMapping("/update")
	public UserResponse updateUser(@RequestBody UserRequest request) {
	    return userService.updateUser(request);
	}
	
}
