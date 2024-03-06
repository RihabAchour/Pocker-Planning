package tn.esprit.pockerplanning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pockerplanning.entities.Card;

public interface CardRepository extends JpaRepository<Card, Long> {
}