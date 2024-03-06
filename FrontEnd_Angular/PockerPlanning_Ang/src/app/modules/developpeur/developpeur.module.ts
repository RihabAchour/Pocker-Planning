import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeveloppeurRoutingModule } from './developpeur-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeveloppeurComponent } from './layout/developpeur/developpeur.component';
import { ListProjetsDeveloppeurComponent } from './views/list-projets-developpeur/list-projets-developpeur.component';

import { EditprofilComponent } from './views/editprofil/editprofil.component';



@NgModule({
  declarations: [
    DeveloppeurComponent,
    ListProjetsDeveloppeurComponent,
        EditprofilComponent
  ],
  imports: [
    CommonModule,
    DeveloppeurRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class DeveloppeurModule { }
