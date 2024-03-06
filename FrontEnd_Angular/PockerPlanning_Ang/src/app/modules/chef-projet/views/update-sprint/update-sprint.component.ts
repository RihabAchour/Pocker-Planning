import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Sprint } from 'src/app/core/models/sprint';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';
import { SprintService } from 'src/app/core/services/sprint.service';

@Component({
  selector: 'app-update-sprint',
  templateUrl: './update-sprint.component.html',
  styleUrls: ['./update-sprint.component.css']
})
export class UpdateSprintComponent {
  sprintId?: number;
  sprint: Sprint = new Sprint();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sprintService: SprintService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.sprintId = this.route.snapshot.params['id'];
    this.getSprintDetails();
  }

  getSprintDetails() {
    if (this.sprintId) {
      this.sprintService.getSprintById(this.sprintId).subscribe(data => {
        this.sprint = data;
      });
    }
  }


  updateSprint() {
   // Récupérer les segments de l'URL
  const urlSegments = this.route.snapshot.url;

  // Vérifier s'il y a suffisamment de segments pour extraire l'ID du projet
  if (urlSegments.length >= 2) {
    // Extraire l'ID du projet à partir du premier segment de l'URL
    const projectId = +urlSegments[1].path;
  
    if (this.sprintId && projectId) {
      this.sprintService.updateSprint(this.sprint).subscribe(() => {
        // Affichez une notification de succès
        this.toastr.success('Sprint updated successfully!', 'Success');

        // Rediriger vers la page de la liste des projets après un certain délai
        setTimeout(() => {
          this.router.navigate(['/list-sprints-chefp', projectId]); // Assurez-vous que votre route est correctement configurée
        }, 2000);
      }, error => {
        console.error('Error updating sprint:', error);
        // Affichez une notification d'erreur
        this.toastr.error('Failed to update sprint. Please try again later.', 'Error');
      });
    }
  } else {
    console.error('Project ID not found in URL');
    // Gérer le cas où l'ID du projet n'est pas présent dans l'URL
  }
  }
}

















/*

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Sprint } from 'src/app/core/models/sprint';
import { SprintService } from 'src/app/core/services/sprint.service';
import { Project } from 'src/app/core/models/project';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';

@Component({
  selector: 'app-update-sprint',
  templateUrl: './update-sprint.component.html',
  styleUrls: ['./update-sprint.component.css']
})
export class UpdateSprintComponent implements OnInit {
  sprintForm!: FormGroup;
  sprintId?: number;
  projectId?: Project;
  minObjectiveLength: number = 10;
  maxObjectiveLength: number = 50;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sprintService: SprintService,
    private projectService: ProjectServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.sprintId = this.route.snapshot.params['id'];
    this.getProjectIdFromUrl();
    this.initForm();
    this.getSprintDetails();
  }

  initForm(): void {
    this.sprintForm = this.formBuilder.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      duration: ['', Validators.required],
      objective: ['', [Validators.required, Validators.minLength(this.minObjectiveLength), Validators.maxLength(this.maxObjectiveLength)]]
    });
  }

  getSprintDetails(): void {
    if (this.sprintId) {
      this.sprintService.getSprintById(this.sprintId).subscribe(data => {
        this.sprintForm.patchValue(data); // Remplir le formulaire avec les détails du sprint récupéré
      });
    }
  }

  updateSprint(): void {
    if (this.sprintForm.valid && this.sprintId && this.projectId) {
      const sprintData = this.sprintForm.value;
      const startDate = new Date(sprintData.startDate);
      const endDate = new Date(sprintData.endDate);
      const duration = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
  
      const sprint: Sprint = {
        name: sprintData.name,
        startDate: sprintData.startDate,
        endDate: sprintData.endDate,
        duration: duration,
        objective: sprintData.objective,
        id: this.sprintId, // Utiliser l'ID du sprint existant
        project: this.projectId // Utiliser l'objet Project existant
      };
  
      this.sprintService.updateSprint(sprint).subscribe(
        () => {
          this.toastr.success('Sprint updated successfully!', 'Success');
          setTimeout(() => {
            this.router.navigate(['/list-sprints-chefp', this.projectId]); // Utiliser l'ID du projet pour la redirection
          }, 2000);
        },
        error => {
          console.error('Error updating sprint:', error);
          this.toastr.error('Failed to update sprint. Please try again later.', 'Error');
        }
      );
    } else {
      if (this.sprintForm.get('name')?.errors?.['required']) {
        this.toastr.error('Sprint Name is required.', 'Error');
      } else if (this.sprintForm.get('startDate')?.errors?.['required']) {
        this.toastr.error('Start Date is required.', 'Error');
      } else if (this.sprintForm.get('endDate')?.errors?.['required']) {
        this.toastr.error('End Date is required.', 'Error');
      } else if (this.sprintForm.get('endDate')?.errors?.['dateComparison']) {
        this.toastr.error('End Date must be after Start Date.', 'Error');
      } else if (this.sprintForm.get('objective')?.errors?.['required']) {
        this.toastr.error('Objective is required.', 'Error');
      } else if (this.sprintForm.get('objective')?.errors?.['minlength']) {
        this.toastr.error(`Objective must be at least ${this.minObjectiveLength} characters long.`, 'Error');
      } else if (this.sprintForm.get('objective')?.errors?.['maxlength']) {
        this.toastr.error(`Objective cannot be more than ${this.maxObjectiveLength} characters long.`, 'Error');
      } else {
        this.toastr.error('Please fill in all required fields correctly.', 'Error');
      }
      this.sprintForm.markAllAsTouched();
    }
  }

  private getProjectIdFromUrl(): void {
    const urlSegments = this.route.snapshot.url;
    if (urlSegments.length >= 2) {
      const projectId = +urlSegments[1].path;
      this.projectService.getProjectById(projectId).subscribe((project: Project) => {
        this.projectId = project;
      }, error => {
        console.error('Error fetching project details:', error);
        // Gérer l'erreur selon vos besoins
      });
    } else {
      console.error('Project ID not found in URL');
      // Gérer le cas où l'ID du projet n'est pas présent dans l'URL
    }
  }
}
*/















