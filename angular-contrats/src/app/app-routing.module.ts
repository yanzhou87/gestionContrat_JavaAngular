import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {CreerUtilisateurComponent} from "./creer-utilisateur/creer-utilisateur.component";

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch:'full'},
  { path: 'creerutilisateur', component: CreerUtilisateurComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
