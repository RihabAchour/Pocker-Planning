package tn.esprit.pockerplanning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pockerplanning.entities.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
}