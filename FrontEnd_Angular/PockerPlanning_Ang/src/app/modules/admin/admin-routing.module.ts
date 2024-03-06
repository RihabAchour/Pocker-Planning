import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { ListChefprojetComponent } from './views/list-chefprojet/list-chefprojet.component';
import { ListProjetsComponent } from './views/list-projets/list-projets.component';
import { CreateProjectComponent } from './views/create-project/create-project.component';
import { UpdateProjectComponent } from './views/update-project/update-project.component';
import { DetailsProjetComponent } from './views/details-projet/details-projet.component';
import { AssignDevelopersToProjectComponent } from './views/assign-developers-to-project/assign-developers-to-project.component';
import { DashboardProjectsComponent } from './views/dashboard-projects/dashboard-projects.component';
import { DeveloppeurComponent } from '../developpeur/layout/developpeur/developpeur.component';
import { ListDeveloppeurComponent } from './views/list-developpeur/list-developpeur.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children:[
    { path: 'list-chefprojet', component: ListChefprojetComponent },
    { path: 'list-projet', component: ListProjetsComponent },
    { path: 'create-project', component: CreateProjectComponent },
    { path: 'update-project/:id', component: UpdateProjectComponent },
    { path: 'details-project/:id', component: DetailsProjetComponent },
    { path: 'assignDevelopers-project/:id', component: AssignDevelopersToProjectComponent },
    { path: 'dashboard-project', component: DashboardProjectsComponent},
    { path: 'listdeveloppeur', component: ListDeveloppeurComponent }

    

    
    
  //  { path: 'list-projet/:page', component: ListProjetsComponent },
    

    
  ] }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
