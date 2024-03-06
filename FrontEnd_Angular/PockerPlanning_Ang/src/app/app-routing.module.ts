import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageAcceuilComponent } from './home/pageAcceuil/page-acceuil/page-acceuil.component';
import { SigninComponent } from './home/sign-in/signin/signin.component';
import { SignupComponent } from './home/sign-up/signup/signup.component';
import { ForgotpasswordComponent } from './home/forgot-password/forgotpassword/forgotpassword.component';
import { Error404Component } from './home/error404/error404/error404.component';
import { ResetpasswordComponent } from './home/reset-password/resetpassword/resetpassword.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin/admin.guard';
import { ChefprojetGuard } from './guards/chefprojet/chefprojet.guard';
import { DeveloppeurGuard } from './guards/developpeur/developpeur.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'home', canActivate:[AuthGuard], component:PageAcceuilComponent},
  { path: 'signin', canActivate:[AuthGuard], component: SigninComponent },
  { path: 'signup', canActivate:[AuthGuard], component: SignupComponent },
  { path: 'forgot-password', canActivate:[AuthGuard], component: ForgotpasswordComponent },
  { path: 'resetpassword/:passwordResetToken', canActivate:[AuthGuard],component:ResetpasswordComponent },
  { path: 'admin', canActivate:[AdminGuard], loadChildren:()=>import('./modules/admin/admin.module').then(x => x.AdminModule) },
  { path: 'chefProjet',  canActivate:[ChefprojetGuard],loadChildren:()=>import('./modules/chef-projet/chef-projet.module').then(x => x.ChefProjetModule) },
  { path: 'developpeur',canActivate:[DeveloppeurGuard], loadChildren:()=>import('./modules/developpeur/developpeur.module').then(x => x.DeveloppeurModule) },
  { path: '**', component: Error404Component }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
