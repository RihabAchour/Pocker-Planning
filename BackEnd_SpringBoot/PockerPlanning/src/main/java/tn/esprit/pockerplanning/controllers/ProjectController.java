package tn.esprit.pockerplanning.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pockerplanning.entities.Project;
import tn.esprit.pockerplanning.entities.User;
import tn.esprit.pockerplanning.entities.enums.Domain;
import tn.esprit.pockerplanning.entities.enums.StatusProject;
import tn.esprit.pockerplanning.services.IPDFServiceImp;
import tn.esprit.pockerplanning.services.IProjectService;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

@Slf4j
@RestController
@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RequestMapping("project")
public class ProjectController {
    public final IProjectService iProjectService;
    public final IPDFServiceImp iPDFServiceImp;
    @PostMapping("/addPAndAssign/{id}")
    public Project addProjectAndAssignProjectToUser(@RequestBody Project p, @PathVariable long id) {
        return iProjectService.addProjectAndAssignProjectToUser(p,id);
    }

   /* @GetMapping("/getAllProjects")
    public Set<Project> getAllProjetcs(){
        return new HashSet<>(iProjectService.getAllProjetcs());
    }*/
   @GetMapping("/getAllProjects")
   public List<Project> getAllProjetcs(){
       List<Project> projects = iProjectService.getAllProjetcs();
       log.debug("Projects retrieved from backend: {}", projects);
       return projects;
   }


    @GetMapping("/getAllProjectsByUser/{id}")
    public List<Project> getProjectsByUserId(@PathVariable Long id){
        return iProjectService.getProjectsByUserId(id);
    }

    @DeleteMapping("/deleteProject/{id}")
    public void deleteProjectById(@PathVariable Long id){
        iProjectService.deleteProjectById(id);
    }

    @PutMapping("/updateProject")
    public Project updateProject(@RequestBody Project p){
       return iProjectService.updateProject(p);
    }

    @GetMapping("/getProjectById/{id}")
    public Project findById(@PathVariable long id) {
        return iProjectService.findById(id);
    }

    @PutMapping("/assignProjectToDeveloper/{idProject}/{idDevelopers}")
    public Project assignProjectToDeveloper(@PathVariable Long idProject,@PathVariable List<Long> idDevelopers){
        return iProjectService.assignProjectToDevelopers(idProject,idDevelopers);
    }

   @GetMapping("/getAllDevelopers/{id}")
    public List<User> getAllDevelopers(@PathVariable Long id) {
        return iProjectService.getAllDevelopers(id);
    }

    @GetMapping("/getDevelopersByProjectId/{id}")
    public List<User> getDevelopersByProjectId(@PathVariable Long id) {
        return iProjectService.getDevelopersByProjectId(id);
    }

    @GetMapping("/project-stats")
    public ResponseEntity<Map<String, Integer>> getProjectStats() {
        Map<String, Integer> stats = new HashMap<>();
        stats.put("inProgress", iProjectService.countProjectsByStatus(StatusProject.INPROGRESS));
        stats.put("pending", iProjectService.countProjectsByStatus(StatusProject.PANDING));
        stats.put("completed", iProjectService.countProjectsByStatus(StatusProject.COMPLETED));
        return ResponseEntity.ok(stats);
    }

    //@RequestParam(required = false) pour indiquer que ces paramètres ne sont pas obligatoires lors de l'appel de l'endpoint.
    @GetMapping("/search")
    public List<Project> searchProjects(@RequestParam(required = false) Integer badget,
                                        @RequestParam(required = false) LocalDate startDate,
                                        @RequestParam(required = false) LocalDate endDate,
                                        @RequestParam(required = false) StatusProject status,
                                        @RequestParam(required = false) Domain domain,
                                        @RequestParam(required = false) String name,
                                        @RequestParam(required = false) Integer nbDeveloper) {
        return iProjectService.searchProjects(badget, startDate, endDate, status, domain, name, nbDeveloper);
    }

    @GetMapping("/pdf")
    public ResponseEntity<byte[]> generatePDF() {
        try {
            List<Project> projects = iProjectService.getAllProjetcs();
            byte[] pdfContent = IPDFServiceImp.generatePDF(projects);
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfContent);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
