package com.savenotes.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.savenotes.entities.User;
import com.savenotes.repo.UserRepo;

@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserRepo repo;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	// Helper method to create ResponseEntity instances
	private ResponseEntity<String> buildResponse(HttpStatus status, String message) {
		return ResponseEntity.status(status).body("{\"message\": \"" + message + "\"}");
	}

	@PostMapping(path = "/user", consumes = { "application/json" })
	public ResponseEntity<String> addUser(@RequestBody User user) {
		try {
			Optional<User> existingUser = repo.findById(user.getEmail());
			if (existingUser.isPresent()) {
				return buildResponse(HttpStatus.CONFLICT, "User already exists.");
			}

			// Hash the user's password
			String hashedPassword = passwordEncoder.encode(user.getPass());
			user.setPass(hashedPassword);

			repo.save(user);
			return buildResponse(HttpStatus.CREATED, "User added successfully.");
		} catch (Exception e) {
			return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred.");
		}
	}

	@PutMapping(path = "/user", consumes = { "application/json" })
	public ResponseEntity<String> saveOrUpdateUser(@RequestBody User user) {
		try {
			Optional<User> existingUser = repo.findById(user.getEmail());
			if (!existingUser.isPresent()) {
				return buildResponse(HttpStatus.NOT_FOUND, "User not found.");
			}
			repo.save(user);
			return buildResponse(HttpStatus.OK, "User updated successfully.");
		} catch (Exception e) {
			return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred.");
		}
	}

	@GetMapping(path = "/user")
	public ResponseEntity<?> getUsers() {
		try {
			List<User> users = repo.findAll();
			return ResponseEntity.status(HttpStatus.OK).body(users);
		} catch (Exception e) {
			return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred.");
		}
	}

	@GetMapping("/user/{email}")
	public ResponseEntity<?> getUserByEmail(@PathVariable("email") String email) {
		try {
			Optional<User> user = repo.findById(email);
			if (user.isPresent()) {
				return ResponseEntity.status(HttpStatus.OK).body(user.get());
			}
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		} catch (Exception e) {
			return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred.");
		}
	}

	@DeleteMapping("/user/{email}")
	public ResponseEntity<String> deleteUserByEmail(@PathVariable("email") String email) {
		try {
			Optional<User> user = repo.findById(email);
			if (user.isPresent()) {
				repo.delete(user.get());
				return buildResponse(HttpStatus.OK, "User deleted successfully.");
			}
			return buildResponse(HttpStatus.NOT_FOUND, "User not found.");
		} catch (Exception e) {
			return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred.");
		}
	}

	@PostMapping(path = "/login", consumes = { "application/json" })
	public ResponseEntity<String> login(@RequestBody User user) {
		try {
			Optional<User> existingUser = repo.findById(user.getEmail());
			if (existingUser.isPresent()) {
				User storedUser = existingUser.get();
				if (passwordEncoder.matches(user.getPass(), storedUser.getPass())) {
					return buildResponse(HttpStatus.OK, "Login successfully.");
				} else {
					return buildResponse(HttpStatus.UNAUTHORIZED, "Invalid password.");
				}
			} else {
				return buildResponse(HttpStatus.UNAUTHORIZED, "Invalid email.");
			}
		} catch (Exception e) {
			return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred.");
		}
	}

}
