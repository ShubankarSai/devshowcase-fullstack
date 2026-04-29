package com.devshowcase.backend.dto;

import java.util.List;

public class PortfolioResponse {

    private String name;
    private String email;
    private String bio;
    private String githubLink;

    private List<ProjectResponse> projects;

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

	public List<ProjectResponse> getProjects() {
		return projects;
	}

	public void setProjects(List<ProjectResponse> projects) {
		this.projects = projects;
	}

}
