import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChefProjetComponent } from './layout/chef-projet/chef-projet.component';
import { ListProjetsComponent } from './views/list-projets/list-projets.component';
import { CreateProjectComponent } from './views/create-project/create-project.component';
import { DetailsProjetComponent } from './views/details-projet/details-projet.component';
import { AssignDevelopersToProjectComponent } from './views/assign-developers-to-project/assign-developers-to-project.component';
import { UpdateProjectComponent } from './views/update-project/update-project.component';
import { SprintsListComponent } from './views/sprints-list/sprints-list.component';
import { CreateSprintComponent } from './views/create-sprint/create-sprint.component';
import { UpdateSprintComponent } from './views/update-sprint/update-sprint.component';
import { DetailsSprintComponent } from './views/details-sprint/details-sprint.component';
import { EditprofilComponent } from './views/editprofil/editprofil.component';

const routes: Routes = [
  { path: '', component: ChefProjetComponent, children:[
    { path: 'editprofil', component: EditprofilComponent },
    { path: 'list-projet-chefp', component: ListProjetsComponent },
    { path: 'create-project-chefp', component: CreateProjectComponent },
    { path: 'update-project-chefp/:id', component: UpdateProjectComponent },
    { path: 'details-project-chefp/:id', component: DetailsProjetComponent },
    { path: 'assignDevelopers-project-chefp/:id', component: AssignDevelopersToProjectComponent },
    { path: 'list-sprints-chefp/:id', component: SprintsListComponent},
    { path: 'create-sprint-chefp/:id', component: CreateSprintComponent},
    { path: 'update-sprint-chefp/:id/:id', component: UpdateSprintComponent},
    { path: 'details-sprint-chefp/:id', component: DetailsSprintComponent },



    
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChefProjetRoutingModule { }
