package com.devshowcase.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devshowcase.backend.dto.PortfolioResponse;
import com.devshowcase.backend.dto.ProjectRequest;
import com.devshowcase.backend.dto.ProjectResponse;
import com.devshowcase.backend.service.ProjectService;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

	@Autowired
	private ProjectService projectService;
	
	@PostMapping
	public ProjectResponse createProject(@RequestBody ProjectRequest request) {
		String email = (String) SecurityContextHolder.getContext()
				.getAuthentication()
				.getPrincipal();
		
		return projectService.createProject(request, email);
	}
	
	@GetMapping("/my")
	public List<ProjectResponse> getMyProjects(){
		return projectService.getMyProjects();
	}
	
	@PutMapping("/{id}")
	public ProjectResponse updateProject(@PathVariable Long id, @RequestBody ProjectRequest request) {
		return projectService.updateProject(id, request);
	}
	
	@DeleteMapping("/{id}")
	public String deleteProject(@PathVariable Long id) {
	    projectService.deleteProject(id);
	    return "Project deleted successfully";
	}
	
	@GetMapping
	public List<ProjectResponse> getAllProjects() {
	    return projectService.getAllProjects();
	}
	
	@GetMapping("/{id}")
	public ProjectResponse getProjectById(@PathVariable Long id) {
	    return projectService.getProjectById(id);
	}
	
	@GetMapping("/portfolio/{email}")
	public PortfolioResponse getPortfolio(@PathVariable String email) {
	    return projectService.getPortfolio(email);
	}
	
}
