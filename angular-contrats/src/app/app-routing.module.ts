import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {CreerUtilisateurComponent} from "./creer-utilisateur/creer-utilisateur.component";
import {ContratsComponent} from "./contrats/contrats.component";
import {MenuComponent} from "./menu/menu.component";
import {ContratsExpirantsComponent} from "./contrats-expirants/contrats-expirants.component";
import {ContratComponent} from "./contrat/contrat.component";
import {CreerContratComponent} from "./creer-contrat/creer-contrat.component";

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch:'full'},
  { path: 'creerutilisateur', component: CreerUtilisateurComponent},
  { path: 'contrats', component: ContratsComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'contratsexpirants', component: ContratsExpirantsComponent},
  { path: 'contrat', component: ContratComponent},
  { path: 'creercontrat', component: CreerContratComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
