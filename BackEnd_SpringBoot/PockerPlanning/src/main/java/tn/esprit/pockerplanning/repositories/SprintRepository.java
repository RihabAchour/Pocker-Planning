package tn.esprit.pockerplanning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pockerplanning.entities.Sprint;

import java.util.Set;

public interface SprintRepository extends JpaRepository<Sprint, Long> {
    Set<Sprint> findByProjectId(long project_id);
}