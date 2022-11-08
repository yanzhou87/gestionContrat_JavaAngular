import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Utilisateur} from "../models/utilisateur";
import * as buffer from "buffer";

@Injectable()
export class UserService {
  private apiServiceUrl =  "";
  private nomUtilisateurCourant: string = "";
  private isLogin : boolean = false
  constructor(private http:HttpClient) {
    this.apiServiceUrl = 'http://localhost:8080'
  }

  public getUtilisateurParNom(nom: string | undefined, motDePasse : string):Observable<Utilisateur>{
    const utilisateur : Observable<Utilisateur> = this.http.get<Utilisateur>(`${this.apiServiceUrl}/utilisateurs/${nom}`)
    utilisateur.subscribe(
      user => {
        if(user.nom){
          console.log("getUSER : "+user.nom)
          this.nomUtilisateurCourant = user.nom
          if(user.motDePasse == motDePasse){
            this.isLogin = true
          }
        }
      },
      error => {

      }
    )
    return utilisateur
  }

  public getNomCourrant() : string {
    console.log("SERVE GET COURRANT : "+this.nomUtilisateurCourant)
    return this.nomUtilisateurCourant;
  }

  public getLogin() : boolean {
      return this.isLogin;
  }

  public setLogin(isLogin : boolean) : void {
    this.isLogin = isLogin
  }
}
