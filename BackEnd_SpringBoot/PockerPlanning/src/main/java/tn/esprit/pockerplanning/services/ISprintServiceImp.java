package tn.esprit.pockerplanning.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tn.esprit.pockerplanning.entities.Project;
import tn.esprit.pockerplanning.entities.Sprint;
import tn.esprit.pockerplanning.entities.User;
import tn.esprit.pockerplanning.repositories.ProjectRepository;
import tn.esprit.pockerplanning.repositories.SprintRepository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class ISprintServiceImp implements ISprintService {
    private final SprintRepository sprintRepository;
    private final ProjectRepository projectRepository;

    @Override
    public Sprint addSprintAndAssignSprintToProject(Sprint s, long id) {

        Project project = projectRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid project Id"));
        // Vérifier si le Set de sprints du projet est null, puis l'initialiser si nécessaire
        if (project.getSprintSet() == null) {
           project.setSprintSet(new HashSet<>());
        }

        //Ajouter le sprint au set des sprints du projet
        project.getSprintSet().add(s);
        //Ajouter le projet au sprint
        s.setProject(project);
        //Sauvegarder les changements
        sprintRepository.save(s);
           return s;


    }

    @Override
    public List<Sprint> getSprintsByProjectId(Long id) {
        Set<Sprint> sprintSet = sprintRepository.findByProjectId(id);
        List<Sprint> sprintList = new ArrayList<>(sprintSet);
        return sprintList;
    }

    @Override
    public void deleteSprintById(Long id) {
        sprintRepository.deleteById(id);
    }

    @Override
    public Sprint updateSprint(Sprint p) {
        return sprintRepository.save(p);
    }

    @Override
    public Sprint findById(long id) {
        return sprintRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid sprint Id"));
    }
}
