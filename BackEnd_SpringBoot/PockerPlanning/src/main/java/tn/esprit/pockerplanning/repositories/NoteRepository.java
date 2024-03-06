package tn.esprit.pockerplanning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pockerplanning.entities.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {
}