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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreerUtilisateurComponent,
    MenuComponent,
    ContratsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
