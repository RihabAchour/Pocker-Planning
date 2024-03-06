import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project';
import { User } from 'src/app/core/models/user';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';

@Component({
  selector: 'app-list-projets-developpeur',
  templateUrl: './list-projets-developpeur.component.html',
  styleUrls: ['./list-projets-developpeur.component.css']
})
export class ListProjetsDeveloppeurComponent implements OnInit {
  //userId = 2; // Remplacez par l'ID de l'utilisateur par l'id du user connecté
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  user!: User;
  projects?: Project[]; 
  page: number = 1; 
  count: number = 0; 
  tableSize: number = 3; 
  tableSizes: any = [1, 2, 4, 6, 8]; 

  selectedProject: Project | null = null; // Nouvelle variable pour stocker le projet sélectionné pour afficher les détails

  constructor(private projectService: ProjectServiceService) { }

  ngOnInit(): void {
    this.projectslist();
  }

  projectslist() {
    this.projectService.getProjectsByUserId(this.userconnect.id)
      .subscribe(projects => {
        this.projects = projects;
        this.count = projects.length; // Mettre à jour le nombre total de projets
      });
}

  // Méthode pour ouvrir la modal avec les détails du projet sélectionné
  showProjectDetails(project: Project) {
    this.selectedProject = project;
    //$('#projectDetailsModal').modal('show');
  }


  

  // Autres méthodes pour la pagination

  OnTableDataChange(event: any) {
    this.page = event;
    this.projectslist();
  }

  OnTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.projectslist();
  }

  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.count / this.tableSize);
    return Array(pageCount).fill(0).map((x, i) => i + 1);
  }
  
}
