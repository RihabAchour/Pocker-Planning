import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sprint } from 'src/app/core/models/sprint';
import { SprintService } from 'src/app/core/services/sprint.service';

@Component({
  selector: 'app-details-sprint',
  templateUrl: './details-sprint.component.html',
  styleUrls: ['./details-sprint.component.css']
})
export class DetailsSprintComponent {
  sprintId: number =0;
  sprint: Sprint = new Sprint();

  constructor(
    private route: ActivatedRoute,
    private sprintService: SprintService
  ) { }

  ngOnInit(): void {
    this.sprintId = this.route.snapshot.params['id'];
    this.getSprintDetails();
  }

  getSprintDetails(): void {
    this.sprintService.getSprintById(this.sprintId).subscribe(
      (data: Sprint) => {
        this.sprint = data;
      },
      (error) => {
        console.error('Error fetching project details:', error);
      }
    );
  }

}
