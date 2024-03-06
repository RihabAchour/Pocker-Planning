package tn.esprit.pockerplanning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pockerplanning.entities.UserStory;

public interface UserStoryRepository extends JpaRepository<UserStory, Long> {
}