import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Sprint } from 'src/app/core/models/sprint';
import { SprintService } from 'src/app/core/services/sprint.service';

@Component({
  selector: 'app-create-sprint',
  templateUrl: './create-sprint.component.html',
  styleUrls: ['./create-sprint.component.css']
})
export class CreateSprintComponent implements OnInit {
  sprintForm!: FormGroup;
  projectId!: number;
  minObjectiveLength: number = 10;
  maxObjectiveLength: number = 50;

  constructor(
    private formBuilder: FormBuilder,
    private sprintService: SprintService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du projet à partir de l'URL
    const projectId: string | null = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.projectId = +projectId; // Affecter projectId récupéré à l'attribut de la classe
    } else {
      // Gérer le cas où l'ID du projet est null
      console.error('Project ID is null');
    }
    this.initForm();
  }

  initForm(): void {
    this.sprintForm = this.formBuilder.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      duration: [{value: '', disabled: true}, Validators.required],
      objective: ['', [Validators.required, Validators.minLength(this.minObjectiveLength), Validators.maxLength(this.maxObjectiveLength)]]
    });

    // Observer les changements dans la date de début et de fin pour mettre à jour la durée
    const startDateControl = this.sprintForm.get('startDate');
    if (startDateControl) {
      startDateControl.valueChanges.subscribe(() => {
        this.updateDuration();
      });
    }

    const endDateControl = this.sprintForm.get('endDate');
    if (endDateControl) {
      endDateControl.valueChanges.subscribe(() => {
        this.updateDuration();
      });
    }
  }

  updateDuration(): void {
    const startDateControl = this.sprintForm.get('startDate');
    const endDateControl = this.sprintForm.get('endDate');

    if (startDateControl && endDateControl) {
      const startDate = startDateControl.value;
      const endDate = endDateControl.value;

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const duration = Math.floor((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
        this.sprintForm.patchValue({ duration: duration });

        // Vérification de la date de fin par rapport à la date de début
        if (end <= start) {
          endDateControl.setErrors({ dateComparison: true });
        } else {
          endDateControl.setErrors(null);
        }
      }
    }
  }

  addSprint(): void {
    if (this.sprintForm.valid) {
      const sprintData = this.sprintForm.value;
      const startDate = new Date(sprintData.startDate);
      const endDate = new Date(sprintData.endDate);
      const duration = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
  
      const sprint: Sprint = {
        name: sprintData.name,
        startDate: sprintData.startDate,
        endDate: sprintData.endDate,
        duration: duration, // Utiliser la valeur calculée de duration
        objective: sprintData.objective,
        id: sprintData.id, // Ajouter une valeur par défaut pour l'ID si nécessaire
        project: sprintData.project, // Ajouter une valeur par défaut pour le projet si nécessaire
      }
      this.sprintService.addSprintAndAssignSprintToProject(sprint, this.projectId).subscribe(
        (newSprint: Sprint) => {
          this.sprintForm.reset();
          this.toastr.success('Sprint added successfully!', 'Success');
          setTimeout(() => {
            this.router.navigate(['/chefProjet/list-sprints-chefp', this.projectId]);
          }, 2000);
        },
        error => {
          console.error('Error adding sprint:', error);
          this.toastr.error('Failed to add sprint. Please try again later.', 'Error');
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
}








/*import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Sprint } from 'src/app/core/models/sprint';
import { SprintService } from 'src/app/core/services/sprint.service';

@Component({
  selector: 'app-create-sprint',
  templateUrl: './create-sprint.component.html',
  styleUrls: ['./create-sprint.component.css']
})
export class CreateSprintComponent {
  sprint: Sprint = new Sprint(); // Initialisez un nouvel objet Project
  projectId!: number; // Déclarer projectId comme attribut de la classe

  constructor(private sprintService: SprintService,private toastr: ToastrService,private router: Router,private route: ActivatedRoute) {
    
    }
    ngOnInit(): void {
      // Récupérer l'ID du projet à partir de l'URL
      const projectId: string | null = this.route.snapshot.paramMap.get('id');
      if (projectId) {
        this.projectId = +projectId; // Affecter projectId récupéré à l'attribut de la classe
      } else {
        // Gérer le cas où l'ID du projet est null
        console.error('Project ID is null');
      }
    }
  
    addSprint(): void {
      // Vérifier si l'un des champs requis est null
      if (!this.sprint.name || !this.sprint.startDate || !this.sprint.endDate || !this.sprint.duration || !this.sprint.objective) {
        // Afficher une notification d'erreur
        this.toastr.error('Please fill in all required fields.', 'Error');
        return; // Arrêter l'exécution de la méthode si un champ est null
      }
  
      this.sprintService.addSprintAndAssignSprintToProject(this.sprint, this.projectId).subscribe(
        (newSprint: Sprint) => {
          // Réinitialisez les détails du sprint après l'ajout réussi
          this.sprint = new Sprint();
  
          // Affichez une notification de succès
          this.toastr.success('Sprint added successfully!', 'Success');
  
          // Rediriger vers une autre page après un certain délai (par exemple, la liste des sprints)
          setTimeout(() => {
            this.router.navigate(['/list-sprints-chefp',this.projectId]); // Assurez-vous d'avoir correctement configuré vos routes
          }, 2000); // Délai en millisecondes
        },
        (error) => {
          console.error('Error adding sprint:', error);
          // Affichez une notification d'erreur
          this.toastr.error('Failed to add sprint. Please try again later.', 'Error');
        }
      );
    }
   
}*/