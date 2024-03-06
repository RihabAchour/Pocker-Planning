import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChefProjetRoutingModule } from './chef-projet-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChefProjetComponent } from './layout/chef-projet/chef-projet.component';
import { ListProjetsComponent } from './views/list-projets/list-projets.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CreateProjectComponent } from './views/create-project/create-project.component';
import { UpdateProjectComponent } from './views/update-project/update-project.component';
import { DetailsProjetComponent } from './views/details-projet/details-projet.component';
import { AssignDevelopersToProjectComponent } from './views/assign-developers-to-project/assign-developers-to-project.component';
import { CreateSprintComponent } from './views/create-sprint/create-sprint.component';
import { SprintsListComponent } from './views/sprints-list/sprints-list.component';
import { UpdateSprintComponent } from './views/update-sprint/update-sprint.component';
import { DetailsSprintComponent } from './views/details-sprint/details-sprint.component'
import { EditprofilComponent } from './views/editprofil/editprofil.component';


@NgModule({
  declarations: [
    ChefProjetComponent,
    ListProjetsComponent,
    CreateProjectComponent,
    UpdateProjectComponent,
    DetailsProjetComponent,
    AssignDevelopersToProjectComponent,
    CreateSprintComponent,
    SprintsListComponent,
    UpdateSprintComponent,
    DetailsSprintComponent,
    EditprofilComponent
  ],
  imports: [
    CommonModule,
    ChefProjetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ]
})
export class ChefProjetModule { }
