package com.devshowcase.backend.dto;

public class UserResponse {

	private Long id;
	private String name;
    private String email;
    private String bio;
    private String githubLink;
    
    public UserResponse(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    
    
    public UserResponse() {
    }
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
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
