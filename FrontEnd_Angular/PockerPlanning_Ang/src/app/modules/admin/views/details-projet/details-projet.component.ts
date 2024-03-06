import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/core/models/project';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';

@Component({
  selector: 'app-details-projet',
  templateUrl: './details-projet.component.html',
  styleUrls: ['./details-projet.component.css']
})
export class DetailsProjetComponent implements OnInit {
  projectId: number =0;
  project: Project = new Project();

  

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectServiceService
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    this.getProjectDetails();
  }

  getProjectDetails(): void {
    this.projectService.getProjectById(this.projectId).subscribe(
      (data: Project) => {
        this.project = data;
      },
      (error) => {
        console.error('Error fetching project details:', error);
      }
    );
  }
}

