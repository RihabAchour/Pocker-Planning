import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './modules/admin/admin.module';
import { ChefProjetModule } from './modules/chef-projet/chef-projet.module';
import { DeveloppeurModule } from './modules/developpeur/developpeur.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageAcceuilComponent } from './home/pageAcceuil/page-acceuil/page-acceuil.component';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SigninComponent } from './home/sign-in/signin/signin.component';
import { SignupComponent } from './home/sign-up/signup/signup.component';
import { ResetpasswordComponent } from './home/reset-password/resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './home/forgot-password/forgotpassword/forgotpassword.component';
import { Error404Component } from './home/error404/error404/error404.component';



@NgModule({
  declarations: [
    AppComponent,
    PageAcceuilComponent,
    SigninComponent,
    SignupComponent,
    ResetpasswordComponent,
    ForgotpasswordComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminModule,
    ChefProjetModule,
    DeveloppeurModule,
    ToastrModule.forRoot(), // Ajoutez ceci pour importer les notifications Toastr
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
