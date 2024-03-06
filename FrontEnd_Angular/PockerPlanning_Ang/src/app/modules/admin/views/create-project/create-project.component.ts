import { Component } from '@angular/core';
import { Domain, Project, StatusProject } from 'src/app/core/models/project';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  project: Project = new Project(); // Initialisez un nouvel objet Project
  userId: number = 1; // Remplacez par l'ID de l'utilisateur connecté
 /*userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  user!: User;*/


  // Déclarez les options pour les listes déroulantes
  domainOptions: string[];
  statusOptions: string[];

  constructor(private projectService: ProjectServiceService,private toastr: ToastrService,private router: Router) {
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

  addProject(): void {
    // Vérifier si l'un des champs requis est null
    if (!this.project.name || !this.project.startDate || !this.project.endDate || !this.project.nbDeveloper || !this.project.objective || !this.project.technology || !this.project.badget || !this.project.domain || !this.project.statusProject) {
      // Afficher une notification d'erreur
      this.toastr.error('Please fill in all required fields.', 'Error');
      return; // Arrêter l'exécution de la méthode si un champ est null
    }
  
    this.projectService.addProjectAndAssignProjectToUser(this.project, this.userId).subscribe(
      response => {
        // Réinitialisez les détails du projet après l'ajout réussi
        this.project = new Project();
        
        // Affichez une notification de succès
        this.toastr.success('Project added successfully!', 'Success');

         // Rediriger vers la page de la liste des projets après 2 secondes (2000 ms)
      setTimeout(() => {
        this.router.navigate(['/admin/list-projet']); // Assurez-vous d'avoir correctement configuré vos routes
      }, 2000);
      },
      error => {
        console.error('Error adding project:', error);
        // Affichez une notification d'erreur
        this.toastr.error('Failed to add project. Please try again later.', 'Error');
      }
    );
  }
}