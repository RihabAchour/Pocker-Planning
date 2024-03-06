package tn.esprit.pockerplanning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pockerplanning.entities.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
}