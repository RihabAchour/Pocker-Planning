import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { User } from '../models/user';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  private baseUrl = 'http://localhost:8980/PockerPlanning'; // Remplacez par l'URL de votre backend Spring


  constructor(private http: HttpClient) { }
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/project/getAllProjects`);
  }

  addProjectAndAssignProjectToUser(project: Project, userId: number): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}/project/addPAndAssign/${userId}`, project);
  }
  
// Méthode pour supprimer un projet par son ID
deleteProjectById(id: number) {
  return this.http.delete(`${this.baseUrl}/project/deleteProject/${id}`);
}

// Méthode pour mettre à jour un projet
updateProject(project: Project): Observable<Project> {
  return this.http.put<Project>(`${this.baseUrl}/project/updateProject`, project);
}
  // Méthode pour récupérer un projet par son ID
  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/project/getProjectById/${id}`);
  }

  //Assigner developpeurs au projet
  assignDevelopersToProject(idProject: number, idDevelopers: number[]): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/project/assignProjectToDeveloper/${idProject}/${idDevelopers.join(',')}`, {});
  }
    // Méthode pour récupérer tous les développeurs
    getAllDevelopers(projectId: number): Observable<User[]> {
      return this.http.get<User[]>(`${this.baseUrl}/project/getAllDevelopers/${projectId}`);
    }

    //methode pour recupere les developpeurs assigné a un projet specifique
    getDevelopersByProjectId(projectId: number): Observable<User[]> {
      return this.http.get<User[]>(`${this.baseUrl}/project/getDevelopersByProjectId/${projectId}`);
    }
    
    //recuperer les projets propre au user
    getProjectsByUserId(userId: number): Observable<Project[]> {
      return this.http.get<Project[]>(`${this.baseUrl}/project/getAllProjectsByUser/${userId}`);
    }


    //statistiques
    getProjectStats(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/project/project-stats`);
    }

    //recherche
    searchProjects(params: any): Observable<Project[]> {
      return this.http.get<Project[]>(`${this.baseUrl}/project/search`, { params });
    }

    //generation de doc pdf
    generatePDF(): Observable<Blob> {
      return this.http.get(`${this.baseUrl}/project/pdf`, {
        responseType: 'blob',
      });
    }


   /* generatePDFWithTable(projects: any[]): void {
      let doc: any = new jsPDF();
      const headers = [['Project ID', 'Project Name', 'End Date', 'Domain', 'Budget', 'Status']];
  
      const data = projects.map(project => [
        project.id,
        project.name,
        project.endDate,
        project.domain,
        project.badget,
        project.statusProject
      ]);
  
      doc.text('List of Projects', 10, 10);
      doc.autoTable({
        startY: 20,
        head: headers,
        body: data
      });
  
      doc.save('projects.pdf');
    }*/


   /* generatePDFWithTable(projects: any[]): void {
      let doc: any = new jsPDF();
      let tableData:any = [];
      const headers = ['Project ID', 'Project Name', 'End Date', 'Domain', 'Budget', 'Status'];
    
      projects.forEach(project => {
        const rowData = [
          project.id,
          project.name,
          project.endDate,
          project.domain,
          project.badget,
          project.statusProject
        ];
        tableData.push(rowData);
      });
    
      doc.autoTable({
        head: [headers],
        body: tableData,
        theme: 'grid' // Choisissez un thème pour le tableau, par exemple : 'striped', 'grid', 'plain', etc.
      });
    
      doc.save('projects.pdf');
    }*/
}
