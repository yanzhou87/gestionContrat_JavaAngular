import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Utilisateur} from "../models/utilisateur";
import {Contrat} from "../models/contrat";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class UserService {
  private apiServiceUrl = environment.apiBaseUrl;
  private nomUtilisateurCourant: string = "";
  private isLogin: boolean = false
  private contratId: number = 0;

  constructor(private http: HttpClient, private router: Router) {
    const nomlocal = localStorage.getItem("nom_utilisateur")
    const contratId = localStorage.getItem("contratId")
    if (nomlocal) {
      this.nomUtilisateurCourant = nomlocal;
    }
    if (contratId) {
      this.contratId = Number(contratId)
    }
  }

  public getUtilisateurParNom(nom: string | undefined, motDePasse: string): Observable<Utilisateur> {
    const utilisateur: Observable<Utilisateur> = this.http.get<Utilisateur>(`${this.apiServiceUrl}/utilisateurs/${nom}`)
    utilisateur.subscribe({
        next: user => {
          if (user.nom) {
            this.nomUtilisateurCourant = user.nom
            localStorage.setItem("nom_utilisateur", user.nom);
            if (user.motDePasse == motDePasse) {
              this.isLogin = true
            }
          }
        }
      }
    )
    return utilisateur
  }

  public getNomCourrant(): string {
    return this.nomUtilisateurCourant;
  }

  public getLogin(): boolean {
    return this.isLogin;
  }

  public setLogin(isLogin: boolean): void {
    this.isLogin = isLogin
  }

  public postUnUtilisateur(nom: string, motDePasse: string, courriel: string): Observable<any> {
    return this.http.post<object>(`${this.apiServiceUrl}/utilisateurs`, {
      id: 0,
      nom: nom,
      motDePasse: motDePasse,
      courriel: courriel
    });
  }

  public getContrats(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.apiServiceUrl}/utilisateurs/${this.nomUtilisateurCourant}/contrats`)
  }

  public getContratsParNomDuClient(nomClient: string): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.apiServiceUrl}/utilisateurs/${this.nomUtilisateurCourant}/contrats/${nomClient}`)
  }

  public getContratsExpirants(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.apiServiceUrl}/utilisateurs/${this.nomUtilisateurCourant}/contratsExpirants`)
  }

  public getContratsExpirantsParNomDuClient(nomClient: string): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.apiServiceUrl}/utilisateurs/${this.nomUtilisateurCourant}/contratsExpirant/${nomClient}`)
  }

  public getContratParId(id: number): void {
    localStorage.setItem("contratId", id.toString());
  }

  public getContrat(): Observable<Contrat> {
    return this.http.get<Contrat>(`${this.apiServiceUrl}/utilisateurs/contrats/${this.contratId}`);
  }

  public postUnContrat(contrat: Contrat): Observable<any> {
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

