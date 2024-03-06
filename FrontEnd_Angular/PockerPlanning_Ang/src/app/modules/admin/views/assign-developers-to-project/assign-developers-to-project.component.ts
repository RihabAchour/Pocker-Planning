import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';

@Component({
  selector: 'app-assign-developers-to-project',
  templateUrl: './assign-developers-to-project.component.html',
  styleUrls: ['./assign-developers-to-project.component.css']
})
export class AssignDevelopersToProjectComponent implements OnInit {
  projectId!: number;
  developersList: User[] = [];
  project: any; // Déclaration de la variable project pour stocker les détails du projet
  nbDeveloper!: number;
  selectedDevelopers: number[] = [];
  projectDevelopers: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectServiceService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
  
    // Récupérer les détails du projet en fonction de l'ID
    this.projectService.getProjectById(this.projectId)
      .subscribe(
        (project: any) => {
          this.project = project;
          this.nbDeveloper = project.nbDeveloper;
  
          // Utiliser la méthode pour récupérer les développeurs assignés à ce projet
          this.projectService.getDevelopersByProjectId(this.projectId)
            .subscribe(
              (developers: User[]) => {
                this.projectDevelopers = developers;
              },
              error => {
                console.error('Failed to fetch developers assigned to this project:', error);
              }
            );
        },
        error => {
          console.error('Failed to fetch project details:', error);
        }
      );
  
    // Récupérer la liste des développeurs depuis le service
    this.projectService.getAllDevelopers(this.projectId)
      .subscribe(
        (developers: User[]) => {
          this.developersList = developers;
        },
        error => {
          console.error('Failed to fetch developers:', error);
        }
      );
  }
  


  // Méthode appelée lors de la soumission du formulaire
  assignDevelopers() {
    if (this.selectedDevelopers.length > 0) {
      this.projectService.assignDevelopersToProject(this.projectId, this.selectedDevelopers)
        .subscribe(
          response => {
            console.log('Developers assigned successfully!', response);
            // Ajoutez ici toute logique de redirection ou autre action après attribution des développeurs
            this.toastr.success('Developers assigned successfully!', 'Success');
             // Rediriger vers la page de la liste des projets après 2 secondes (2000 ms)
             setTimeout(() => {
              window.location.reload();//rafraichir la page 
             /* this.router.navigate(['details-project', this.projectId]); // Utilisation de l'ID réel du projet
            }, 2000*/
          }
            );

          },
          error => {
            console.error('Failed to assign developers:', error);
            // Gérer l'erreur d'attribution des développeurs
            this.toastr.error('error', 'Error');
          }
        );
    } else {
      console.warn('No developers selected.');
    }
  }
} 