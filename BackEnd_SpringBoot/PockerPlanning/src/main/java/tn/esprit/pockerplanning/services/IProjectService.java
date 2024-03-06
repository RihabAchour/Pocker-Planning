package tn.esprit.pockerplanning.services;

import tn.esprit.pockerplanning.entities.Project;
import tn.esprit.pockerplanning.entities.User;
import tn.esprit.pockerplanning.entities.enums.Domain;
import tn.esprit.pockerplanning.entities.enums.StatusProject;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface IProjectService {
    Project addProjectAndAssignProjectToUser(Project p , long id);
    List<Project> getAllProjetcs();
    List<Project> getProjectsByUserId(Long id);

    void deleteProjectById(Long id);
    Project updateProject(Project p);
    Project findById(long id);
    Project assignProjectToDevelopers(Long idProject, List<Long> idDevelopers);

    List<User> getAllDevelopers(Long id);

    List<User>getDevelopersByProjectId(Long id);
    int countProjectsByStatus(StatusProject status);
    List<Project> searchProjects(Integer badget, LocalDate startDate,
                                 LocalDate endDate, StatusProject status, Domain domain,String name,Integer nbDeveloper);
}
