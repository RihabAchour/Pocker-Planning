package tn.esprit.pockerplanning.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.server.DelegatingServerHttpResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.esprit.pockerplanning.entities.Project;
import tn.esprit.pockerplanning.entities.User;
import tn.esprit.pockerplanning.entities.enums.Domain;
import tn.esprit.pockerplanning.entities.enums.Role;
import tn.esprit.pockerplanning.entities.enums.StatusProject;
import tn.esprit.pockerplanning.repositories.ProjectRepository;
import tn.esprit.pockerplanning.repositories.UserRepository;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class IProjectServiceImp implements IProjectService {
    public final ProjectRepository projectRepository;
    public final UserRepository userRepository;

    @Override
    public Project addProjectAndAssignProjectToUser(Project p, long id) {

        projectRepository.save(p);
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid user Id"));
        // Vérifier si le Set de projets de l'utilisateur est null, puis l'initialiser si nécessaire
        if (user.getProjectSet() == null) {
            user.setProjectSet(new HashSet<>());
        }
        // Vérifier si le Set d'utilisateurs du projet est null, puis l'initialiser si nécessaire
        if (p.getUserSet() == null) {
            p.setUserSet(new HashSet<>());
        }
        //Ajouter l'utilisateur au set des users de project
        p.getUserSet().add(user);
        //Ajouter le projet au set des projets de l'utilisateur
        user.getProjectSet().add(p);
        //Sauvegarder les changements
        userRepository.save(user);
        return projectRepository.save(p);


    }

    @Override
    public List<Project> getAllProjetcs() {
        return projectRepository.findAll();
    }
    @Override
    public List<Project> getProjectsByUserId(Long id) {
        Set<Project> projectsSet = projectRepository.findByUserSetId(id);
        List<Project> projectsList = new ArrayList<>(projectsSet);
        return projectsList;
    }

    /* @Override
     public void deleteProjectById(Long id) {

         projectRepository.deleteById(id);
     }*/
    @Override
    public void deleteProjectById(Long id) {
        Optional<Project> optionalProject = projectRepository.findById(id);
        if (optionalProject.isPresent()) {
            Project project = optionalProject.get();
            // Supprimer l'affectation de ce projet à tous les utilisateurs associés
            for (User user : project.getUserSet()) {
                user.getProjectSet().remove(project);
            }
            // Supprimer le projet
            projectRepository.deleteById(id);
        } else {
            // Gérer le cas où le projet n'est pas trouvé
            throw new NoSuchElementException("Project with id " + id + " not found");
        }
    }

    @Override
    public Project updateProject(Project p) {
        return projectRepository.save(p);
    }

    @Override
    public Project findById(long id) {
        return projectRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("project does not exist!"));
    }

    @Transactional
    @Override
    public Project assignProjectToDevelopers(Long idProject, List<Long> idDevelopers) {
        Project p = projectRepository.findById(idProject).orElseThrow(() -> new IllegalArgumentException("Project does not exist!"));
        {
            if(p.getNbDeveloper()>=idDevelopers.size()){
                for (Long idDeveloper : idDevelopers) {

                    User u = userRepository.findById(idDeveloper).orElseThrow(() -> new IllegalArgumentException("User does not exist!"));
                   // if (u.getRole().equals("DEVELOPER")) {
                        u.getProjectSet().add(p);
                  //  } else {
                      //  throw new IllegalArgumentException("you must assign the project to a developer!");
                   // }

                }
            }
            else {
                throw new IllegalArgumentException("you must assign the project to "+p.getNbDeveloper()+" developers!");
            }

            return p;


        }
    }

   /* @Override
    public List<User> getAllDevelopers() {
        return userRepository.findByRole(Role.DEVELOPER);
    }*/

    @Override
    public List<User> getAllDevelopers(Long id) {
        return userRepository.findByRoleAndNotAssignedToProject(Role.DEVELOPER, id);
    }
    @Override
    public List<User> getDevelopersByProjectId(Long id) {
        return userRepository.findByProjectSetIdAndRole(id, Role.DEVELOPER);
    }

    @Override
    public int countProjectsByStatus(StatusProject status) {
        return projectRepository.countProjectBystatusProject(status);
    }

    @Override
    public List<Project> searchProjects(Integer badget, LocalDate startDate, LocalDate endDate, StatusProject status
            , Domain domain,String name,Integer nbDeveloper) {
      //return projectRepository.findProjectsByCriteria(badget,startDate,endDate,status,domain,name,nbDeveloper);
        // Logique de filtrage des projets en fonction des critères de recherche
        List<Project> projects = getAllProjetcs(); // Suppose que vous avez une méthode pour obtenir tous les projets
        List<Project> filteredProjects = new ArrayList<>();

        for (Project project : projects) {
            if ((badget == null || project.getBadget()==(badget)) &&
                    (startDate == null || project.getStartDate().equals(startDate)) &&
                    (endDate == null || project.getEndDate().equals(endDate)) &&
                    (status == null || project.getStatusProject().equals(status)) &&
                    (domain == null || project.getDomain().equals(domain)) &&
                    (name == null || project.getName().contains(name)) &&
                    (nbDeveloper == null || project.getNbDeveloper()==(nbDeveloper))) {
                filteredProjects.add(project);
            }
        }

        return filteredProjects;
    }




}
