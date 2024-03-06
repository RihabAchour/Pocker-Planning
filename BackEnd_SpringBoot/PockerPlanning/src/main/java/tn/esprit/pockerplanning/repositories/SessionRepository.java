package tn.esprit.pockerplanning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pockerplanning.entities.Session;

public interface SessionRepository extends JpaRepository<Session, Long> {
}