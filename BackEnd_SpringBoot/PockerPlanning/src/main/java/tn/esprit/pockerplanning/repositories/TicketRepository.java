package tn.esprit.pockerplanning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pockerplanning.entities.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}