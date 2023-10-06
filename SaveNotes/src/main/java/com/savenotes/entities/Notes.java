package com.savenotes.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "notes")
public class Notes {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "title")
	private String title;

	@Column(name = "content", length = 500)
	private String content;

	@Column(name = "timestamp")
	private LocalDateTime timestamp;

	@Column(name = "userId")
	private String userId;

	public Notes() {
	}

	public Notes(String title, String content, LocalDateTime timestamp, String userId) {
		this.title = title;
		this.content = content;
		this.timestamp = timestamp;
		this.userId = userId;
	}

	public Long getId() {
		return id;
	}
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "Notes [id=" + id + ", title=" + title + ", content=" + content + ", timestamp=" + timestamp
				+ ", userId=" + userId + "]";
	}
	
	
}