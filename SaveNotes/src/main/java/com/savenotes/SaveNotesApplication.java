package com.savenotes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SaveNotesApplication {

	public static void main(String[] args) {
		SpringApplication.run(SaveNotesApplication.class, args);
	}

}
