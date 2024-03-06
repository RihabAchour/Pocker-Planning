package tn.esprit.pockerplanning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.esprit.pockerplanning.entities.Project;
import tn.esprit.pockerplanning.entities.enums.Domain;
import tn.esprit.pockerplanning.entities.enums.StatusProject;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    Set<Project> findByUserSetId(long userSet_id);
    int countProjectBystatusProject(StatusProject status);

    @Query("SELECT p FROM Project p WHERE " +
            "(:badget IS NULL OR p.badget = :badget) AND " +
            "(:startDate IS NULL OR p.startDate >= :startDate) AND " +
            "(:endDate IS NULL OR p.endDate <= :endDate) AND " +
            "(:status IS NULL OR p.statusProject = :status) AND " +
            "(:domain IS NULL OR p.domain = :domain) AND " +
            "(:name IS NULL OR p.name = :name) AND " +
            "(:nbDeveloper IS NULL OR p.nbDeveloper = :nbDeveloper)")
    List<Project> findProjectsByCriteria(@Param("badget") Integer badget,
                                         @Param("startDate") LocalDate startDate,
                                         @Param("endDate") LocalDate endDate,
                                         @Param("status") StatusProject status,
                                         @Param("domain") Domain domain,
                                         @Param("name") String name,
                                         @Param("nbDeveloper") Integer nbDeveloper);
}