import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Utilisateur} from "../models/utilisateur";
import {Contrat} from "../models/contrat";

@Injectable()
export class UserService {
  private apiServiceUrl =  "";
  private nomUtilisateurCourant: string = "";
  private isLogin : boolean = false
  private isInscription = false;
  private contratId : number = 0;
  private contrat : Contrat = {
    id: 0,
    nom: "",
    dateDebut: "",
    dateFin: "",
    nomClient: "",
    montant: 0,
    modeDuPaiement: ""
  }
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

  public postUnUtilisateur(nom: string, motDePasse: string, courriel : string): Observable<any>{
    return this.http.post<object>(`${this.apiServiceUrl}/utilisateurs`, {
      id: 0,
      nom: nom,
      motDePasse: motDePasse,
      courriel: courriel
    });
  }

  public getContrats():Observable<Contrat[]>{
    return this.http.get<Contrat[]>(`${this.apiServiceUrl}/utilisateurs/${this.nomUtilisateurCourant}/contrats`)
  }

  public getContratsParNomDuClient(nomClient : string) : Observable<Contrat[]>{
    return this.http.get<Contrat[]>(`${this.apiServiceUrl}/utilisateurs/${this.nomUtilisateurCourant}/contrats/${nomClient}`)
  }

  public getContratsExpirants():Observable<Contrat[]>{
    return this.http.get<Contrat[]>(`${this.apiServiceUrl}/utilisateurs/${this.nomUtilisateurCourant}/contratsExpirants`)
  }

  public getContratsExpirantsParNomDuClient(nomClient : string) : Observable<Contrat[]>{
    return this.http.get<Contrat[]>(`${this.apiServiceUrl}/utilisateurs/${this.nomUtilisateurCourant}/contratsExpirant/${nomClient}`)
  }

  public saveContratId(id : number) : void{
    alert(id)
    this.contratId = id;
  }

  public getContratParId(id : number) : Contrat{
    this.http.get<Contrat>(`${this.apiServiceUrl}/utilisateurs/contrats/${id}`).subscribe(
      {
        next: value => {
          this.contrat = value;
        }
      }
    )
    return this.contrat
  }

  public getContrat(): Contrat {
    return this.contrat
  }

  public postUnContrat(contrat: Contrat): Observable<any>{
    return this.http.post<object>(`${this.apiServiceUrl}/utilisateurs/${this.nomUtilisateurCourant}/create"`, {
      nom: contrat.nom,
      dateDebut: contrat.dateDebut,
      dateFin: contrat.dateFin,
      nomClient: contrat.nomClient,
      montant: contrat.montant,
      modeDuPaiement: contrat.modeDuPaiement
    });
  }

}

