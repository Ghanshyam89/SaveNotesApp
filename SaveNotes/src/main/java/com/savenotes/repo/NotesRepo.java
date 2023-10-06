package com.savenotes.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.savenotes.entities.Notes;


public interface NotesRepo extends JpaRepository<Notes, Long>{

//	public List<Notes> findById(String id);

	public List<Notes> findTop10ByUserIdOrderByTimestampDesc(String userId);

	@Modifying
	@Transactional
	@Query(value = "DELETE FROM notes\r\n"
			+ "WHERE user_id = :userId\r\n"
			+ "AND id NOT IN (\r\n"
			+ "    SELECT id\r\n"
			+ "    FROM (\r\n"
			+ "        SELECT id\r\n"
			+ "        FROM notes\r\n"
			+ "        WHERE user_id = :userId\r\n"
			+ "        ORDER BY timestamp DESC\r\n"
			+ "        LIMIT 10\r\n"
			+ "    ) AS recent_notes\r\n"
			+ ");\r\n"
			+ "",
	        nativeQuery = true)
	void deleteOldNotesExceptRecent10(@Param("userId") String userId);

	
	
}
