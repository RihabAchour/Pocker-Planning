package tn.esprit.pockerplanning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pockerplanning.entities.Evenement;

public interface EvenementRepository extends JpaRepository<Evenement, Long> {
}