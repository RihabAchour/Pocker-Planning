import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as qs from 'qs'; 
import jsPDF from 'jspdf';


@Component({
  selector: 'app-list-projets',
  templateUrl: './list-projets.component.html',
  styleUrls: ['./list-projets.component.css']
})
export class ListProjetsComponent implements OnInit{

 /* currentPage: number = 1;
  totalProjects: number = 2; // Mettez à jour le nombre total de projets
  projectsPerPage: number = 2;
  projects?: Project[];*/

  projects?: any; 
  //project?:Project;
  filteredProjects: Project[] = [];
  page: number = 1; //variable qui stocke le numéro de la page actuelle. Par défaut, 1ère page est affichée.
  count: number = 0; // nombre total d'éléments à paginer. Par défaut, il est initialisé à 0
  tableSize: number = 3; //C'est la taille de la table, c'est-à-dire le nombre d'éléments à afficher par page. Par défaut,taille de page à 1.
  tableSizes: any = [1,2,4,6,8]; //choisir parmi ces tailles de page pour afficher le nombre souhaité d'éléments par page.
  sortBy: keyof Project | null = null; // Variable pour stocker le critère de tri par défaut
  sortOrder: 'asc' | 'desc' = 'asc'; // Variable pour stocker l'ordre de tri par défaut

  /*criteria: any = {
    badget: null,
    startDate: null,
    endDate: null,
    status: null,
    domain: null,
    nbDeveloper: null
  }; // On aura besoin dans la recherche*/
  searchCriteria: string = ''; // pour la recherche
  // criteria = qs.parse(this.searchCriteria, { allowDots: true });
  constructor(
    private projectService: ProjectServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchProjects(); //pour charger les projets initiaux.
  }
 

  //////////////////////
  //stocke les projets dans la variable projects
  projectslist():void{
    this.projectService.getAllProjects().subscribe(response=>{
      this.projects = response;
      console.log(this.projects);
    })
  }


  fetchProjects(): void {
    this.projectService.getAllProjects().subscribe(
      (response: Project[]) => {
        this.projects = response;
        this.applySearchFilter();
      },
      (error) => {
        console.error('Error fetching projects:', error);
        this.toastr.error('Failed to fetch projects. Please try again later.', 'Error');
      }
    );
  }




  applySearchFilter(): void {
    if (!this.searchCriteria) {
      this.filteredProjects = this.projects;
      return;
    }
  
    const criteria = this.searchCriteria.trim().toLowerCase();
    this.filteredProjects = this.projects.filter((project: Project) => {
      // Example filtering logic based on project properties
      return project.name.toLowerCase().includes(criteria) ||
             project.domain.toString().toLowerCase().includes(criteria) ||
             project.statusProject.toString().toLowerCase().includes(criteria) || // Ajoutez autant de conditions que nécessaire
             project.endDate.includes(criteria) ||
             project.startDate.includes(criteria) ||
             project.badget === parseFloat(criteria); // Convertir criteria en nombre avant de comparer
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

//methode pour effectuer le tri multicritaire
sortProjects(property: keyof Project, order: 'asc' | 'desc'): void {
  this.projects.sort((a:any, b:any) => {
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

//generation de pdf :
generatePDF(): void {
  this.projectService.generatePDF().subscribe((response: Blob) => {
    const file = new Blob([response], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL); // Ouvre le PDF dans un nouvel onglet
  }, error => {
    console.error('Failed to generate PDF:', error);
    // Gérer les erreurs ici
  });
}

generatePDFWithTable(): void {
  let doc: any = new jsPDF();
  const headers = [['Project ID', 'Project Name', 'Start Date' , 'End Date', 'Domain', 'Budget', 'Status']];
  
  const data = this.projects.map((project:Project) => {
    let textColor = '';
    if (project.statusProject.toString()=== 'COMPLETED') {
      textColor = 'green'; // Vert pour les projets terminés
    } else if (project.statusProject.toString() === 'PANDING') {
      textColor = 'red'; // Rouge pour les projets en attente
    } else if (project.statusProject.toString() === 'INPROGRESS') {
      textColor = 'blue'; // Bleu pour les projets en cours
    }
    
    // Ajoutez le texte coloré avec la couleur correspondante
    return [
      project.id,
      project.name,
      project.startDate,
      project.endDate,
      project.domain,
      project.badget,
      {content: project.statusProject, styles: { textColor }} // Utilisation de styles pour changer la couleur du texte
    ];
  });

  doc.text('List of Projects', 10, 10);
  doc.autoTable({
    startY: 20,
    head: headers,
    body: data
  });

  doc.save('projects.pdf');
}




}
/*searchProjects(): void {
  const criteria: any = {};

  // Analyser l'entrée de recherche pour extraire les critères
  const searchTerms = this.searchCriteria.split(',');
  searchTerms.forEach(term => {
    const [key, value] = term.trim().split(':');
    if (key && value) {
      criteria[key.trim()] = value.trim();
    }
  });

  // Effectuer la recherche avec les critères extraits
  this.projectService.searchProjects(criteria).subscribe(
    (projects: Project[]) => {
      this.projects = projects;
      console.log("succes");
    },
    (error) => {
      console.error('Search error:', error);
      // Handle and display the error message to the user
    }
  );
}*/






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


 
