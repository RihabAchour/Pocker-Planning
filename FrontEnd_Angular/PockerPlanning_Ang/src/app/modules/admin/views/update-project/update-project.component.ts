import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Domain, Project, StatusProject } from 'src/app/core/models/project';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
  projectId?: number;
  project: Project = new Project();
  // Déclarez les options pour les listes déroulantes
  domainOptions: string[];
  statusOptions: string[];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectServiceService,
    private toastr: ToastrService
  ) { 
     // Initialisez les options pour la liste déroulante Domain
     this.domainOptions = [];
     for (let key in Domain) {
       if (isNaN(Number(Domain[key]))) {
         this.domainOptions.push(Domain[key]);
       }
     }
 
     // Initialisez les options pour la liste déroulante StatusProject
     this.statusOptions = [];
     for (let key in StatusProject) {
       if (isNaN(Number(StatusProject[key]))) {
         this.statusOptions.push(StatusProject[key]);
       }
     }
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    this.getProjectDetails();
  }

  getProjectDetails() {
    if (this.projectId) {
      this.projectService.getProjectById(this.projectId).subscribe(data => {
        this.project = data;
      });
    }
  }

  updateProject() {
    if (this.projectId) {
      this.projectService.updateProject(this.project).subscribe(() => {
         // Affichez une notification de succès
         this.toastr.success('Project updated successfully!', 'Success');

         // Rediriger vers la page de la liste des projets après 2 secondes (2000 ms)
      setTimeout(() => {
        this.router.navigate(['/admin/list-projet']); // Assurez-vous d'avoir correctement configuré vos routes
      }, 2000);
      }, error => {
        console.error('Error adding project:', error);
        // Affichez une notification d'erreur
        this.toastr.error('Failed to update project. Please try again later.', 'Error');
      });
    }
  }
}