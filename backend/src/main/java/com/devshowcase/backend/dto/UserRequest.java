package com.devshowcase.backend.dto;

import jakarta.validation.constraints.*;

public class UserRequest {

	@NotBlank(message = "Name is required")
	private String name;
	
	@Email(message = "Invalid email")
	@NotBlank(message = "Email is required")
	private String email;
	
//	@NotBlank(message = "Password is required")
	private String password;
	
	private String bio;
	private String githubLink;
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getBio() {
		return bio;
	}
	public void setBio(String bio) {
		this.bio = bio;
	}
	public String getGithubLink() {
		return githubLink;
	}
	public void setGithubLink(String githubLink) {
		this.githubLink = githubLink;
	}
	
}
