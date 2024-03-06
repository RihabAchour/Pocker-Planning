package tn.esprit.pockerplanning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pockerplanning.entities.Participation;

public interface ParticipationRepository extends JpaRepository<Participation, Long> {
}