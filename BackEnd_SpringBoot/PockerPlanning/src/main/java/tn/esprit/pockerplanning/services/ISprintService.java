package tn.esprit.pockerplanning.services;


import tn.esprit.pockerplanning.entities.Project;
import tn.esprit.pockerplanning.entities.Sprint;

import java.util.List;

public interface ISprintService {
    Sprint addSprintAndAssignSprintToProject(Sprint s , long id);
    List<Sprint> getSprintsByProjectId(Long id);
    void deleteSprintById(Long id);
    Sprint updateSprint(Sprint p);
    Sprint findById(long id);
}
