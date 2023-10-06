package com.savenotes.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.savenotes.entities.Notes;
import com.savenotes.entities.User;
import com.savenotes.repo.NotesRepo;
import com.savenotes.repo.UserRepo;

@RestController
@RequestMapping("/api/notes")
public class NotesController {
	@Autowired
	private NotesRepo notesRepository;

	@Autowired
	private UserRepo userRepo;

	// End-point to create a new note for a user (POST)
	@PostMapping("/{userId}")
	public ResponseEntity<?> createNote(@PathVariable String userId, @RequestBody Notes note) {
		// Validate the note's content
		String content = note.getContent();
		if (!isValidNoteContent(content)) {
			String errorMessage = "Special characters other than [@ , ; & * + -] are not allowed in the content.";
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
		}

		note.setUserId(userId);
		Notes savedNote = notesRepository.save(note);

		return ResponseEntity.status(HttpStatus.CREATED).body(savedNote);
	}

	// End-point to retrieve recent 10 notes for a user (GET)
	@GetMapping("/{userId}/recent")
	public ResponseEntity<List<Notes>> getRecentNotes(@PathVariable String userId) {
		List<Notes> recentNotes = notesRepository.findTop10ByUserIdOrderByTimestampDesc(userId);
		return ResponseEntity.ok(recentNotes);
	}

	// Scheduled task to delete old notes using a cron expression
	@Scheduled(cron = "0 0 * * * *") // Run every hour
	public void deleteOldNotesTask() {
		System.out.println("Auto DELETION Triggered!");
		
		List<String> userIds = getAllUserIds();
		
		System.out.println(userIds);
		
		for (String userId : userIds) {
			notesRepository.deleteOldNotesExceptRecent10(userId);
		}
	}

	// Method to retrieve all user IDs i.e. Email
	private List<String> getAllUserIds() {
		List<User> users = userRepo.findAll();
		List<String> userIds = new ArrayList<>();

		for (User user : users) {
			userIds.add(user.getEmail());
		}

		return userIds;
	}

	// Method to validate note content
	private boolean isValidNoteContent(String content) {
		// Check for null or empty content
		if (content == null || content.trim().isEmpty()) {
			return false;
		}

		// Check for valid characters and length
		if (!content.matches("^([a-zA-Z0-9@;*+,\\- ]?){1,500}$")) {
			return false;
		}

		return true;
	}
}
