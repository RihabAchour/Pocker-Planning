package tn.esprit.pockerplanning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pockerplanning.entities.Evaluation;

public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
}