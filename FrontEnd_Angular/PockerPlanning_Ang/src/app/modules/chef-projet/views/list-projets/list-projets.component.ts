import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-list-projets',
  templateUrl: './list-projets.component.html',
  styleUrls: ['./list-projets.component.css']
})
export class ListProjetsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  page: number = 1;
  tableSize: number = 3;
  //userId: number = 4;
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  user!: User;
  sortBy: keyof Project | null = null; // Variable pour stocker le critère de tri par défaut
  sortOrder: 'asc' | 'desc' = 'asc'; // Variable pour stocker l'ordre de tri par défaut


  constructor(
    private projectService: ProjectServiceService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.projectslist();
  }

  projectslist() {
    this.projectService.getProjectsByUserId(this.userconnect.id)
      .subscribe(projects => {
        this.projects = projects;
      });
  }

  OnTableDataChange(event: any) {
    this.page = event;
  }

  OnTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  // Méthode pour trier les projets en fonction du critère sélectionné et de l'ordre
 // Méthode pour trier les projets en fonction du critère sélectionné et de l'ordre
// Méthode pour trier les projets en fonction du critère sélectionné et de l'ordre
// Méthode pour trier les projets en fonction du critère sélectionné et de l'ordre
sortProjects(property: keyof Project, order: 'asc' | 'desc'): void {
  this.projects.sort((a, b) => {
    const valueA = a[property];
    const valueB = b[property];
    if (property === 'badget') {
      const budgetA = typeof valueA === 'number' ? valueA : parseFloat(valueA as string);
      const budgetB = typeof valueB === 'number' ? valueB : parseFloat(valueB as string);
      return order === 'asc' ? budgetA - budgetB : budgetB - budgetA;
    } else if (property === 'endDate') {
      // Convertir les dates en objets Date pour le tri
      const dateA = new Date(valueA as string);
      const dateB = new Date(valueB as string);
      return order === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    } else {
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else {
        return order === 'asc' ? (valueA as number) - (valueB as number) : (valueB as number) - (valueA as number);
      }
    }
  });
}




sortDirection: 'asc' | 'desc' = 'asc'; // Ordre de tri par défaut

onSortChange(event: any): void {
  const sortBy = event?.target?.value as keyof Project; // Récupérer la propriété de tri sélectionnée
  if (sortBy) {
    // Mettre à jour le critère de tri actuel
    this.sortBy = sortBy;
    // Réappliquer le tri en fonction du critère sélectionné et de l'ordre
    this.sortProjects(sortBy, this.sortDirection);
  }
}

// Méthode pour inverser l'ordre de tri
toggleSortDirection(): void {
  if (this.sortBy) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortProjects(this.sortBy, this.sortDirection);
  }
}



  // Méthode pour supprimer un projet
  deleteProject(id: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProjectById(id).subscribe(() => {
        console.log('Projet supprimé avec succès');
        this.toastr.success('Project deleted successfully!', 'Success');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }, error => {
        console.error('Erreur lors de la suppression du projet : ', error);
        this.toastr.error('Failed to delete project. Please try again later.', 'Error');
      });
    }
  }
}












/*import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-projets',
  templateUrl: './list-projets.component.html',
  styleUrls: ['./list-projets.component.css']
})
export class ListProjetsComponent implements OnInit{

 
  userId : number = 4;
  projects?: any; 
  page: number = 1; //variable qui stocke le numéro de la page actuelle. Par défaut, 1ère page est affichée.
  count: number = 0; // nombre total d'éléments à paginer. Par défaut, il est initialisé à 0
  tableSize: number = 3; //C'est la taille de la table, c'est-à-dire le nombre d'éléments à afficher par page. Par défaut,taille de page à 1.
  tableSizes: any = [1,2,4,6,8]; //choisir parmi ces tailles de page pour afficher le nombre souhaité d'éléments par page.

  constructor(
    private projectService: ProjectServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.projectslist(); //pour charger les projets initiaux.
  }
 

  //////////////////////
  //stocke les projets dans la variable projects
  projectslist() {
    this.projectService.getProjectsByUserId(this.userId)
      .subscribe(projects => {
        this.projects = projects;
        this.count = projects.length; // Mettre à jour le nombre total de projets
      });
}




  //appelée lorsque l'utilisateur change de page dans la pagination. Elle met à jour la variable page avec le numéro de 
  //la page sélectionnée, puis rappelle projectslist() pour récupérer les données de la nouvelle page.
  OnTableDataChange(event: any){
    this.page = event;
    this.projectslist();
  }


  //Cette méthode est appelée lorsque l'utilisateur change la taille de la table, c'est-à-dire le nombre d'éléments 
  //par page. Elle met à jour la variable tableSize avec la nouvelle taille de la table, réinitialise la variable page à 1
  // (pour afficher la première page) et rappelle projectslist() pour récupérer les données de la nouvelle page.
  OnTableSizeChange(event : any):void {
    this.tableSize = event.target.value;
    this.page=1;
    this.projectslist();
  }


// Méthode pour générer la liste des numéros de page
getPageNumbers(): number[] {
  const pageCount = Math.ceil(this.count / this.tableSize);
  return Array(pageCount).fill(0).map((x, i) => i + 1);
}


 // Méthode pour supprimer un projet
 deleteProject(id: number) {
  if (confirm('Are you sure you want to delete this project?')) {
    this.projectService.deleteProjectById(id).subscribe(() => {
      console.log('Projet supprimé avec succès');
      this.toastr.success('Project deleted successfully!', 'Success');
      // Rafraîchir la page après la suppression avec succès
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }, error => {
      console.error('Erreur lors de la suppression du projet : ', error);
      this.toastr.error('Failed to delete project. Please try again later.', 'Error');
    });
  }
}
}
*/










 /*
  ngOnInit(): void{


    // Récupérer le numéro de page à partir de l'URL
   /* this.route.params.subscribe(params => {
      const page = params['page'] ? parseInt(params['page'], 10) : 1;
      this.setCurrentPage(page);
    });*/

    // Si le paramètre de page n'est pas spécifié dans l'URL, afficher la première page par défaut
   /* if (!this.route.snapshot.params['page']) {
      this.setCurrentPage(1);
    }
  }*/

 /* setCurrentPage(page: number) {
    this.currentPage = page;
    this.fetchProjects(page); // Récupérer les projets pour la page sélectionnée
  }*/

 /* fetchProjects(page: number) {
    const startIndex = (page - 1) * this.projectsPerPage;
    const endIndex = startIndex + this.projectsPerPage;

    this.projectService.getAllProjects().subscribe(
      (data: Project[]) => {
        console.log('Projects received from backend:', data);
        // Filtrer les projets pour n'afficher que ceux de la page actuelle
        this.projects = data.slice(startIndex, endIndex);
      },
      error => {
        console.error('Error fetching projects:', error);
      }
    );
  }*/


  // Méthode pour obtenir le nombre total de pages
 /* getPages(): number[] {
    const pageCount = Math.ceil(this.totalProjects / this.projectsPerPage);
    return Array(pageCount).fill(0).map((x, i) => i + 1);
  }*/


 
