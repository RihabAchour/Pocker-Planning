import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sprint } from '../models/sprint';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  private baseUrl = 'http://localhost:8980/PockerPlanning/sprint'; // Remplacez par l'URL de votre backend Spring

  constructor(private http: HttpClient) { }

  getSprintsByProjectId(projectId: number): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(`${this.baseUrl}/getSprintsByProjectId/${projectId}`);
  }

  addSprintAndAssignSprintToProject(sprint: Sprint, projectId: number): Observable<Sprint> {
    return this.http.post<Sprint>(`${this.baseUrl}/addSAndAssign/${projectId}`, sprint);
  }

  deleteSprintById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteSprint/${id}`);
  }

  updateSprint(sprint: Sprint): Observable<Sprint> {
    return this.http.put<Sprint>(`${this.baseUrl}/updateSprint`, sprint);
  }

  getSprintById(id: number): Observable<Sprint> {
    return this.http.get<Sprint>(`${this.baseUrl}/getSprintById/${id}`);
  }
}
