import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Utilisateur} from "../models/utilisateur";

@Injectable()
export class UserService {
  private apiServiceUrl =  "";
  constructor(private http:HttpClient) {
    this.apiServiceUrl = 'http://localhost:8080'
  }

  public getUtilisateurParNom(nom: string | undefined):Observable<Utilisateur>{
    return this.http.get<Utilisateur>(`${this.apiServiceUrl}/utilisateurs/${nom}`)
  }
}
