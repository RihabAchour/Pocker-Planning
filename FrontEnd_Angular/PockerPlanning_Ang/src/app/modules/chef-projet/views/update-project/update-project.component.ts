import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';
import { Domain, StatusProject } from 'src/app/core/models/project';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
  projectId!: number;
  projectForm!: FormGroup;
  domainOptions!: string[];
  statusOptions!: string[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    this.initForm();
    this.getProjectDetails();
  }

  initForm(): void {
    this.projectForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      nbDeveloper: ['', [Validators.required, Validators.min(5), Validators.max(8)]],
      objective: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      technology: ['', Validators.required],
      badget: ['', Validators.required],
      domain: ['', Validators.required],
      statusProject: ['', Validators.required]
    });
  }

  getProjectDetails(): void {
    this.projectService.getProjectById(this.projectId).subscribe(data => {
      this.projectForm.patchValue(data); // Remplir le formulaire avec les détails du projet
    });
  }

  updateProject(): void {
    if (this.projectForm.valid) {
      const project = this.projectForm.value;
      project.id = this.projectId; // Ajouter l'ID du projet à mettre à jour

      this.projectService.updateProject(project).subscribe(() => {
        this.toastr.success('Project updated successfully!', 'Success');

        setTimeout(() => {
          this.router.navigate(['/chefProjet/list-projet']); // Rediriger vers la liste des projets après 2 secondes
        }, 2000);
      }, error => {
        console.error('Error updating project:', error);
        this.toastr.error('Failed to update project. Please try again later.', 'Error');
      });
    } else {
      // Afficher des messages d'erreur spécifiques à chaque champ
      Object.keys(this.projectForm.controls).forEach(field => {
        const control = this.projectForm.get(field);
        if (control && control.invalid) {
          control.markAsTouched({ onlySelf: true });
          // Ajouter des messages d'erreur spécifiques pour chaque champ si nécessaire
          if (field === 'startDate' && control.errors?.['required']) {
            this.toastr.error('Start Date is required.', 'Error');
          } else if (field === 'endDate' && control.errors?.['required']) {
            this.toastr.error('End Date is required.', 'Error');
          } else if (field === 'endDate' && control.errors?.['dateComparison']) {
            this.toastr.error('End Date must be after Start Date.', 'Error');
          } else if (field === 'nbDeveloper' && control.errors?.['required']) {
            this.toastr.error('Number of Developers is required.', 'Error');
          } else if (field === 'nbDeveloper' && control.errors?.['min']) {
            this.toastr.error('Number of Developers must be at least 5.', 'Error');
          } else if (field === 'nbDeveloper' && control.errors?.['max']) {
            this.toastr.error('Number of Developers cannot be more than 8.', 'Error');
          } else if (field === 'objective' && control.errors?.['required']) {
            this.toastr.error('Objective is required.', 'Error');
          } else if (field === 'objective' && control.errors?.['minlength']) {
            this.toastr.error('Objective must be at least 10 characters long.', 'Error');
          } else if (field === 'objective' && control.errors?.['maxlength']) {
            this.toastr.error('Objective cannot be more than 100 characters long.', 'Error');
          } else if (field === 'technology' && control.errors?.['required']) {
            this.toastr.error('Technology is required.', 'Error');
          } else if (field === 'badget' && control.errors?.['required']) {
            this.toastr.error('Budget is required.', 'Error');
          } else if (field === 'domain' && control.errors?.['required']) {
            this.toastr.error('Domain is required.', 'Error');
          } else if (field === 'statusProject' && control.errors?.['required']) {
            this.toastr.error('Status is required.', 'Error');
          }
        }
      });
    }
  }
}










/*import { Component, OnInit } from '@angular/core';
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
        this.router.navigate(['/list-projet']); // Assurez-vous d'avoir correctement configuré vos routes
      }, 2000);
      }, error => {
        console.error('Error adding project:', error);
        // Affichez une notification d'erreur
        this.toastr.error('Failed to update project. Please try again later.', 'Error');
      });
    }
  }
}*/