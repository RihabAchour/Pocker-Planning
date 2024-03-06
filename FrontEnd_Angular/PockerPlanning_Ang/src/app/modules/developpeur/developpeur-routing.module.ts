import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloppeurComponent } from './layout/developpeur/developpeur.component';
import { ListProjetsDeveloppeurComponent } from './views/list-projets-developpeur/list-projets-developpeur.component';
import { EditprofilComponent } from './views/editprofil/editprofil.component';

const routes: Routes = [
  { path: '', component: DeveloppeurComponent, children:[
    { path: 'editprofil', component:EditprofilComponent  },
    { path: 'list-projet-developpeur', component: ListProjetsDeveloppeurComponent }

    
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloppeurRoutingModule { }
