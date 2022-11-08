import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../models/utilisateur";
import {UserService} from "../services/user.service";
import {filter, Observable} from "rxjs";
import * as buffer from "buffer";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nom : string = ""
  motDePasse : string = ""
  erreurPourMotDePasse : boolean = false
  erreurPourNom : boolean = false

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
  }

  getUtilisateur(): void {
    let utilisateurCourrant: Observable<Utilisateur> = this.userService.getUtilisateurParNom(this.nom,this.motDePasse);

    utilisateurCourrant.subscribe(
      user=>{
        if(user.motDePasse != this.motDePasse){
          console.log("mot de passe")
          this.erreurPourMotDePasse = true
          this.erreurPourNom = false
          console.log(this.erreurPourMotDePasse)
        }else{
          this.nom =""
          this.motDePasse =""
          this.erreurPourMotDePasse = false
          this.erreurPourNom = false
        }
      },
     error => {
         if (error.status == 404){
           this.erreurPourNom = true
           this.erreurPourMotDePasse = false
         }
     });
  }

  getLogin():boolean{
    return this.userService.getLogin()
  }
}
