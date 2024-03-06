import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './layout/admin/admin.component';
import { ListChefprojetComponent } from './views/list-chefprojet/list-chefprojet.component';
import { ListDeveloppeurComponent } from './views/list-developpeur/list-developpeur.component';
import { ListProjetsComponent } from './views/list-projets/list-projets.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CreateProjectComponent } from './views/create-project/create-project.component';
import { UpdateProjectComponent } from './views/update-project/update-project.component';
import { DetailsProjetComponent } from './views/details-projet/details-projet.component';
import { AssignDevelopersToProjectComponent } from './views/assign-developers-to-project/assign-developers-to-project.component';
import { DashboardProjectsComponent } from './views/dashboard-projects/dashboard-projects.component'
//import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AdminComponent,
    ListChefprojetComponent,
    ListDeveloppeurComponent,
    ListProjetsComponent,
    CreateProjectComponent,
    UpdateProjectComponent,
    DetailsProjetComponent,
    AssignDevelopersToProjectComponent,
    DashboardProjectsComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    //ToastrModule.forRoot()
  ]
})
export class AdminModule { 
}
