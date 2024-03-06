package tn.esprit.pockerplanning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pockerplanning.entities.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {
}