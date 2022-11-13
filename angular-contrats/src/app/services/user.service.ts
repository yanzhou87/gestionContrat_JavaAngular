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
  private isInscription = false;
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

  public getIsInscription(): boolean {
    return this.isInscription;
  }

  public postUnUtilisateur(nom: string, motDePasse: string, courriel : string): void{
    this.http.post<object>(`${this.apiServiceUrl}/utilisateurs`,{
      id: 0,
      nom: nom,
      motDePasse:motDePasse,
      courriel: courriel
    }).subscribe(
      repondre =>{
        this.isInscription = true
      },
      error => {

      }
    )
  }
}
