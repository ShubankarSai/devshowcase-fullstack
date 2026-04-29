package com.devshowcase.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devshowcase.backend.dto.PortfolioResponse;
import com.devshowcase.backend.dto.ProjectRequest;
import com.devshowcase.backend.dto.ProjectResponse;
import com.devshowcase.backend.entity.Project;
import com.devshowcase.backend.entity.User;
import com.devshowcase.backend.exception.ResourceNotFoundException;
import com.devshowcase.backend.repository.ProjectRepository;
import com.devshowcase.backend.repository.UserRepository;

@Service
public class ProjectService {

	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	
	@Autowired
	private UserService userService;
	
	public ProjectResponse createProject(ProjectRequest request, String email) {
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));
		
		Project project = new Project();
		
		project.setTitle(request.getTitle());
		project.setDescription(request.getDescription());
		project.setTechStack(request.getTechStack());
        project.setGithubLink(request.getGithubLink());
        project.setLiveLink(request.getLiveLink());
        project.setImageUrl(request.getImageUrl());
        project.setPinned(request.isPinned());
        project.setViews(0);
        
        project.setUser(user);
        
        Project saved = projectRepository.save(project);
        
        ProjectResponse res = new ProjectResponse();
        res.setId(saved.getId());
        res.setTitle(saved.getTitle());
        res.setDescription(saved.getDescription());
        res.setTechStack(saved.getTechStack());
        res.setGithubLink(saved.getGithubLink());
        res.setLiveLink(saved.getLiveLink());
        res.setImageUrl(saved.getImageUrl());
        res.setPinned(saved.isPinned());
        res.setViews(saved.getViews());

        return res;
	}
	
	public List<ProjectResponse> getMyProjects(){
		User user = userService.getLoggedInUser();
		
		List<Project> projects = projectRepository.findByUserId(user.getId());
		
		return projects.stream().map(project -> {
			ProjectResponse res = new ProjectResponse();
			res.setId(project.getId());
			res.setTitle(project.getTitle());
			res.setDescription(project.getDescription());
	        res.setTechStack(project.getTechStack());
	        res.setGithubLink(project.getGithubLink());
	        res.setLiveLink(project.getLiveLink());
	        res.setImageUrl(project.getImageUrl());
	        res.setViews(project.getViews());
	        return res;
		}).toList();
	}
	
	public ProjectResponse updateProject(Long id, ProjectRequest request) {
		
		User user = userService.getLoggedInUser();
		Project project = projectRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Project not found"));
		
		
		if(!project.getUser().getId().equals(user.getId())) {
			throw new RuntimeException("You are not allowed to perform this action");
		}
		
		project.setTitle(request.getTitle());
		project.setDescription(request.getDescription());
	    project.setTechStack(request.getTechStack());
	    project.setGithubLink(request.getGithubLink());
	    project.setLiveLink(request.getLiveLink());
	    project.setImageUrl(request.getImageUrl());
	    
	    Project updated = projectRepository.save(project);
	    
	    ProjectResponse res = new ProjectResponse();
	    res.setId(updated.getId());
	    res.setTitle(updated.getTitle());
	    res.setDescription(updated.getDescription());
	    res.setTechStack(updated.getTechStack());
	    res.setGithubLink(updated.getGithubLink());
	    res.setLiveLink(updated.getLiveLink());
	    res.setImageUrl(updated.getImageUrl());
	    res.setViews(updated.getViews());

	    return res;
		
	}
	
	public void deleteProject(Long id) {

	    Project project = projectRepository.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

	    User user = userService.getLoggedInUser();

	    if (!project.getUser().getId().equals(user.getId())) {
	        throw new RuntimeException("You are not allowed to delete this project");
	    }

	    projectRepository.delete(project);
	}
	
	public List<ProjectResponse> getAllProjects() {

	    List<Project> projects = projectRepository.findAll();

	    return projects.stream().map(project -> {
	        ProjectResponse res = new ProjectResponse();
	        res.setId(project.getId());
	        res.setTitle(project.getTitle());
	        res.setDescription(project.getDescription());
	        res.setTechStack(project.getTechStack());
	        res.setGithubLink(project.getGithubLink());
	        res.setLiveLink(project.getLiveLink());
	        res.setImageUrl(project.getImageUrl());
	        res.setViews(project.getViews());
	        return res;
	    }).toList();
	}
	
	public ProjectResponse getProjectById(Long id) {

	    Project project = projectRepository.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

	    //INCREMENT VIEWS
	    project.setViews(project.getViews() + 1);

	    projectRepository.save(project);

	    ProjectResponse res = new ProjectResponse();
	    res.setId(project.getId());
	    res.setTitle(project.getTitle());
	    res.setDescription(project.getDescription());
	    res.setTechStack(project.getTechStack());
	    res.setGithubLink(project.getGithubLink());
	    res.setLiveLink(project.getLiveLink());
	    res.setImageUrl(project.getImageUrl());
	    res.setViews(project.getViews());

	    return res;
	}
	
	public PortfolioResponse getPortfolio(String email) {

	    User user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

	    List<Project> projects = projectRepository.findByUserId(user.getId());

	    List<ProjectResponse> projectResponses = projects.stream().map(project -> {
	        ProjectResponse res = new ProjectResponse();
	        res.setId(project.getId());
	        res.setTitle(project.getTitle());
	        res.setDescription(project.getDescription());
	        res.setTechStack(project.getTechStack());
	        res.setGithubLink(project.getGithubLink());
	        res.setLiveLink(project.getLiveLink());
	        res.setImageUrl(project.getImageUrl());
	        res.setViews(project.getViews());
	        return res;
	    }).toList();

	    PortfolioResponse response = new PortfolioResponse();
	    response.setName(user.getName());
	    response.setEmail(user.getEmail());
	    response.setBio(user.getBio());
	    response.setGithubLink(user.getGithubLink());
	    response.setProjects(projectResponses);

	    return response;
	}
	
}
