package tn.esprit.pockerplanning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pockerplanning.entities.Badge;

public interface BadgeRepository extends JpaRepository<Badge, Long> {
}