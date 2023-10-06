package com.savenotes.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.savenotes.entities.User;

public interface UserRepo extends JpaRepository<User, String>{
//	public List<User> findAll();
}
