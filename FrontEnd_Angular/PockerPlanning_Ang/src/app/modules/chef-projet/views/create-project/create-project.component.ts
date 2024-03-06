import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Domain, StatusProject } from 'src/app/core/models/project';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  projectForm: FormGroup;
  //userId: number = 4; // Remplacez par l'ID de l'utilisateur connecté
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  user!: User;

  // Déclarez les options pour les listes déroulantes
  domainOptions!: any;
  statusOptions!: any;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectServiceService,
    private toastr: ToastrService,
    private router: Router
  ) {
    // Initialisez les options pour la liste déroulante Domain
    this.domainOptions = Object.values(Domain).filter(val => typeof val === 'string');

    // Initialisez les options pour la liste déroulante StatusProject
    this.statusOptions = Object.values(StatusProject).filter(val => typeof val === 'string');

    // Initialisez le formulaire avec les contrôles et les validateurs
    this.projectForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      nbDeveloper: ['', [Validators.required, Validators.min(5), Validators.max(8)]],
      objective: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      technology: ['', Validators.required],
      badget: ['', Validators.required],
      domain: ['', Validators.required],
      statusProject: ['', Validators.required] // Initialisez la valeur à 'PENDING' et désactivez le champ
    }, { validator: this.dateComparisonValidator }); // Ajouter un validateur personnalisé pour comparer les dates
  }

  // Méthode pour comparer les dates de début et de fin
  dateComparisonValidator(formGroup: FormGroup) {
    const startDateControl = formGroup.get('startDate');
    const endDateControl = formGroup.get('endDate');
  
    if (startDateControl && endDateControl && startDateControl.value && endDateControl.value) {
      const startDate = startDateControl.value;
      const endDate = endDateControl.value;
  
      if (new Date(startDate) >= new Date(endDate)) {
        endDateControl.setErrors({ dateComparison: true });
      } else {
        endDateControl.setErrors(null);
      }
    }
  }
  
  addProject(): void {
    if (this.projectForm.valid) {
      const project = this.projectForm.value;
  
      this.projectService.addProjectAndAssignProjectToUser(project, this.userconnect.id).subscribe(
        response => {
          this.projectForm.reset(); // Réinitialisez le formulaire après l'ajout réussi
  
          this.toastr.success('Project added successfully!', 'Success');
  
          setTimeout(() => {
            this.router.navigate(['/chefProjet/list-projet-chefp']); // Rediriger vers la liste des projets après 2 secondes
          }, 1000);
        },
        error => {
          console.error('Error adding project:', error);
          this.toastr.error('Failed to add project. Please try again later.', 'Error');
        }
      );
    } else {
      // Afficher des messages d'erreur spécifiques à chaque champ
      Object.keys(this.projectForm.controls).forEach(field => {
        const control = this.projectForm.get(field);
        if (control && control.invalid) {
          control.markAsTouched({ onlySelf: true });
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
  





 /* addProject(): void {
    if (this.projectForm.valid) {
      const project = this.projectForm.value;

      this.projectService.addProjectAndAssignProjectToUser(project, this.userId).subscribe(
        response => {
          this.projectForm.reset(); // Réinitialisez le formulaire après l'ajout réussi

          this.toastr.success('Project added successfully!', 'Success');

          setTimeout(() => {
            this.router.navigate(['/list-projet-chefp']); // Rediriger vers la liste des projets après 2 secondes
          }, 2000);
        },
        error => {
          console.error('Error adding project:', error);
          this.toastr.error('Failed to add project. Please try again later.', 'Error');
        }
      );
    } else {
      this.toastr.error('Please fill in all required fields correctly.', 'Error');
    }
  }*/
}















/*
import { Component } from '@angular/core';
import { Domain, Project, StatusProject } from 'src/app/core/models/project';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  project: Project = new Project(); // Initialisez un nouvel objet Project
  userId: number = 4; // Remplacez par l'ID de l'utilisateur connecté


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
        this.router.navigate(['/list-projet-chefp']); // Assurez-vous d'avoir correctement configuré vos routes
      }, 2000);
      },
      error => {
        console.error('Error adding project:', error);
        // Affichez une notification d'erreur
        this.toastr.error('Failed to add project. Please try again later.', 'Error');
      }
    );
  }
}*/











/*import { Component, OnInit } from '@angular/core';
import { Domain, Project, StatusProject } from 'src/app/core/models/project';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit{
  project: Project = new Project(); // Initialisez un nouvel objet Project
  userId: number = 4; // Remplacez par l'ID de l'utilisateur connecté
  projectForm!: FormGroup;

  // Déclarez les options pour les listes déroulantes
  domainOptions: string[];
  statusOptions: string[];

  constructor(private projectService: ProjectServiceService,private toastr: ToastrService,private router: Router, private fb: FormBuilder) {
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
   
    // Initialisez le formulaire avec les contrôles de saisie
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      nbDeveloper: ['', [Validators.required, Validators.max(8)]],
      objective: ['', [Validators.required, Validators.maxLength(300)]],
      technology: ['', Validators.required],
      badget: ['', Validators.required],
      domain: ['', Validators.required],
      statusProject: ['', Validators.required]
    });
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
        this.router.navigate(['/list-projet-chefp']); // Assurez-vous d'avoir correctement configuré vos routes
      }, 2000);
      },
      error => {
        console.error('Error adding project:', error);
        // Affichez une notification d'erreur
        this.toastr.error('Failed to add project. Please try again later.', 'Error');
      }
    );
  }

   // Méthode pour accéder facilement au contrôle de formulaire "name"
   get name() {
    return this.projectForm.get('name');
  }

  // Méthode pour accéder facilement au contrôle de formulaire "startDate"
  get startDate() {
    return this.projectForm.get('startDate');
  }

  // Méthode pour accéder facilement au contrôle de formulaire "endDate"
  get endDate() {
    return this.projectForm.get('endDate');
  }

  // Méthode pour accéder facilement au contrôle de formulaire "nbDeveloper"
  get nbDeveloper() {
    return this.projectForm.get('nbDeveloper');
  }

  // Méthode pour accéder facilement au contrôle de formulaire "objective"
  get objective() {
    return this.projectForm.get('objective');
  }

  // Méthode pour accéder facilement au contrôle de formulaire "technology"
  get technology() {
    return this.projectForm.get('technology');
  }

  // Méthode pour accéder facilement au contrôle de formulaire "badget"
  get badget() {
    return this.projectForm.get('badget');
  }

  // Méthode pour accéder facilement au contrôle de formulaire "domain"
  get domain() {
    return this.projectForm.get('domain');
  }

  // Méthode pour accéder facilement au contrôle de formulaire "statusProject"
  get statusProject() {
    return this.projectForm.get('statusProject');
  }
} */