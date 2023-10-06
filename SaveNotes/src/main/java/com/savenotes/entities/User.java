package com.savenotes.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
	@Id
	String email;
	@Column(name = "first_name")
	String first_name;
	@Column(name = "last_name")
	String last_name;
	@Column(name = "pass")
	String pass;

	public User() {
		super();
	}

	public User(String email, String first_name, String last_name, String pass) {
		super();
		this.email = email;
		this.first_name = first_name;
		this.last_name = last_name;
		this.pass = pass;
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getPass() {
		return pass;
	}

	public void setPass(String pass) {
		this.pass = pass;
	}

}
