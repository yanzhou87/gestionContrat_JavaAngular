import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Contrat} from "../models/contrat";
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";

@Component({
  selector: 'app-creer-contrat',
  templateUrl: './creer-contrat.component.html',
  styleUrls: ['./creer-contrat.component.css']
})
export class CreerContratComponent implements OnInit {

  nomCourant: string = ""
  contrat: Contrat = {
    id: 0,
    nom: "",
    dateDebut:new Date(),
    dateFin:new Date(),
    nomClient: "",
    montant: 0,
    modeDuPaiement: ""
  }

  durer1mois : boolean = false
  durer3mois : boolean = false
  durer6mois : boolean = false
  durer1anee : boolean = false

  modeDuPaiement1mois : boolean = false
  modeDuPaiement3mois : boolean = false
  modeDuPaiement6mois : boolean = false
  modeDuPaiement1anee : boolean = false

  erreurPourNomClient: boolean = false
  erreurPourDateDebut: boolean = false
  erreurPourDateFin: boolean = false
  erreurPourMontant: boolean = false
  erreurPourModeDuPaiement: boolean = false


  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.nomCourant = this.userService.getNomCourrant();
  }

  validePourLesChamps() {
      console.log("date début : "+this.contrat.dateDebut)

  }

  postContrat() {
    this.validePourLesChamps();
    this.userService.postUnContrat(this.contrat)
      .subscribe({
          next: value => {
            window.location.href = "/menu"
          },
          error: repondre => {
          }
        }
      )
  }

  changerPage() {
    window.location.href = "/menu"
  }

  deconnecter() {
    this.userService.setLogin(false)
    window.location.href = "/"
  }

  changerUnMois(){
    this.durer1mois = !this.durer1mois
    if (this.durer1mois && this.contrat.dateDebut) {
      this.contrat.dateFin = new Date(
        this.contrat.dateDebut.getFullYear(),
        this.contrat.dateDebut.setUTCMonth(this.contrat.dateDebut.getUTCMonth()+1),
        this.contrat.dateDebut.getUTCDay())
    }
  }

  changerTroisMois(){
    this.durer3mois = !this.durer3mois
    if (this.durer3mois && this.contrat.dateDebut) {
      this.contrat.dateFin = new Date(
        this.contrat.dateDebut.getUTCFullYear(),
        this.contrat.dateDebut.setUTCMonth(this.contrat.dateDebut.getUTCMonth()+3),
        this.contrat.dateDebut.getUTCDay())
    }
  }

  changersixMois(){
    this.durer6mois = !this.durer6mois
    const annee = this.contrat.dateDebut.toString().split("-")[0]
    const mois = this.contrat.dateDebut.toString().split("-")[1]
    const jour = this.contrat.dateDebut.toString().split("-")[2]
    if (this.durer6mois && this.contrat.dateDebut) {
      this.contrat.dateFin = new Date(
        this.contrat.dateDebut.getUTCFullYear(),
        this.contrat.dateDebut.setUTCMonth(this.contrat.dateDebut.getUTCMonth()+6),
        this.contrat.dateDebut.getUTCDay())
      //this.contrat.dateFin += +  jour.toString() + "-" +(Number(mois) + 6).toString() +"-" + annee.toString()

      console.log(this.contrat.dateFin)
    }
  }

  changerUneAnnee(){
    this.durer1anee = !this.durer1anee
    if (this.durer1anee && this.contrat.dateDebut) {
      this.contrat.dateFin = new Date(
        this.contrat.dateDebut.setUTCFullYear(this.contrat.dateDebut.getUTCFullYear() + 1),
        this.contrat.dateDebut.getUTCMonth(),
        this.contrat.dateDebut.getUTCDay())
    }
    console.log(this.contrat.dateFin)
  }

  annulerChangerMois(){
    this.durer1mois = false
    this.durer3mois = false
    this.durer6mois = false
    this.durer1anee = false
  }
}
