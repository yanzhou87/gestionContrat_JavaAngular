import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { CreerUtilisateurComponent } from './creer-utilisateur/creer-utilisateur.component';
import { UserService } from "./services/user.service";
import { MenuComponent } from './menu/menu.component';
import { ContratsComponent } from './contrats/contrats.component';
import { ContratsExpirantsComponent } from './contrats-expirants/contrats-expirants.component';
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { ContratComponent } from './contrat/contrat.component';
import { CreerContratComponent } from './creer-contrat/creer-contrat.component';
import { OublierMotDePasseComponent } from './oublier-mot-de-passe/oublier-mot-de-passe.component';
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreerUtilisateurComponent,
    MenuComponent,
    ContratsComponent,
    ContratsExpirantsComponent,
    ContratComponent,
    CreerContratComponent,
    OublierMotDePasseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DatePipe
  ],
  providers: [UserService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
