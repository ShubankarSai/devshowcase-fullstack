package com.devshowcase.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devshowcase.backend.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Long>{

	List<Project> findByUserId(Long userId);
	
}
