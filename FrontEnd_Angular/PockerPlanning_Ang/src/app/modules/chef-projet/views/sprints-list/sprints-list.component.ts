import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Sprint } from 'src/app/core/models/sprint';
import { SprintService } from 'src/app/core/services/sprint.service';

@Component({
  selector: 'app-sprints-list',
  templateUrl: './sprints-list.component.html',
  styleUrls: ['./sprints-list.component.css']
})
export class SprintsListComponent implements OnInit {

  sprints: Sprint[] = [];
  projectId!: number; // Variable pour stocker l'ID du projet
  page: number = 1; //variable qui stocke le numéro de la page actuelle. Par défaut, 1ère page est affichée.
  count: number = 0; // nombre total d'éléments à paginer. Par défaut, il est initialisé à 0
  tableSize: number = 3; //C'est la taille de la table, c'est-à-dire le nombre d'éléments à afficher par page. Par défaut,taille de page à 1.
  tableSizes: any = [1,2,4,6,8]; //choisir parmi ces tailles de page pour afficher le nombre souhaité d'éléments par page.


  constructor(
    private sprintService: SprintService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['id']; // Récupérer l'ID du projet depuis l'URL
      this.loadSprintsByProjectId(this.projectId);
    });
  }

  loadSprintsByProjectId(projectId: number): void {
    this.sprintService.getSprintsByProjectId(projectId)
      .subscribe(sprints => {
        this.sprints = sprints;
      });
  }

  OnTableDataChange(event: any){
    this.page = event;
    this.loadSprintsByProjectId(this.projectId);
  }


  OnTableSizeChange(event : any):void {
    this.tableSize = event.target.value;
    this.page=1;
    this.loadSprintsByProjectId(this.projectId);
  }


  // Méthode pour générer la liste des numéros de page
getPageNumbers(): number[] {
  const pageCount = Math.ceil(this.count / this.tableSize);
  return Array(pageCount).fill(0).map((x, i) => i + 1);
}


// Méthode pour supprimer un projet
deleteSprint(id: number) {
  if (confirm('Are you sure you want to delete this sprint?')) {
    this.sprintService.deleteSprintById(id).subscribe(() => {
      console.log('Sprint supprimé avec succès');
      this.toastr.success('Sprint deleted successfully!', 'Success');
      // Rafraîchir la page après la suppression avec succès
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }, error => {
      console.error('Erreur lors de la suppression du sprint : ', error);
      this.toastr.error('Failed to delete sprint. Please try again later.', 'Error');
    });
  }
}
}
