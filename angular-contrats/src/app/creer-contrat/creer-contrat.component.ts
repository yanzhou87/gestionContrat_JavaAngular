import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Contrat} from "../models/contrat";
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";
import {DatePipe} from '@angular/common';

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
    dateDebut: new Date(),
    dateFin: "",
    nomClient: "",
    montant: 0,
    modeDuPaiement: ""
  }

  durer1mois: boolean = false
  durer3mois: boolean = false
  durer6mois: boolean = false
  durer1anee: boolean = false
  hideBoutonDateFin : boolean = false

  modeDuPaiement1mois: boolean = false
  modeDuPaiement3mois: boolean = false
  modeDuPaiement6mois: boolean = false
  modeDuPaiement1anee: boolean = false

  erreurPourNomClient: boolean = false
  erreurPourDateDebut: boolean = false
  erreurPourDateFin: boolean = false
  erreurPourMontant: boolean = false

  constructor(private userService: UserService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    console.log(new Date())
    this.nomCourant = this.userService.getNomCourrant();
  }

  validePourLesChamps() {
    if(this.modeDuPaiement1mois){
      this.modeDuPaiement3mois = false
      this.modeDuPaiement6mois = false
      this.modeDuPaiement1anee = false
      this.contrat.modeDuPaiement = "1 mois"
    }
    if(this.modeDuPaiement3mois){
      this.modeDuPaiement1mois = false
      this.modeDuPaiement6mois = false
      this.modeDuPaiement1anee = false
      this.contrat.modeDuPaiement = "3 mois"
    }
    if(this.modeDuPaiement6mois){
      this.modeDuPaiement1mois = false
      this.modeDuPaiement3mois = false
      this.modeDuPaiement1anee = false
      this.contrat.modeDuPaiement = "6 mois"
    }
    if(this.modeDuPaiement1anee){
      this.modeDuPaiement1mois = false
      this.modeDuPaiement3mois = false
      this.modeDuPaiement6mois = false
      this.contrat.modeDuPaiement = "1 année"
    }
  }

  postContrat() {
    this.validePourLesChamps();
    this.contrat.nom = this.nomCourant
    alert(this.modeDuPaiement6mois)
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

  changerUnMois() {
    this.durer1mois = !this.durer1mois
    this.durer3mois = false
    this.durer6mois = false
    this.durer1anee = false
    this.hideBoutonDateFin = true
    this.contrat.dateFin = ""
    const tmpDate = new Date(this.contrat.dateDebut)
    if (this.durer1mois && this.contrat.dateDebut) {
      tmpDate.setMonth(tmpDate.getMonth() + 1)
      // @ts-ignore
      this.contrat.dateFin = this.datePipe.transform(tmpDate, "yyyy-MM-dd")
    }
  }

  changerTroisMois() {
    this.durer3mois = !this.durer3mois
    this.durer1mois = false
    this.durer6mois = false
    this.durer1anee = false
    this.hideBoutonDateFin = true
    this.contrat.dateFin = ""
    const tmpDate = new Date(this.contrat.dateDebut)
    if (this.durer3mois && this.contrat.dateDebut) {
      tmpDate.setMonth(tmpDate.getMonth() + 3)
      // @ts-ignore
      this.contrat.dateFin = this.datePipe.transform(tmpDate, "yyyy-MM-dd")
    }
  }

  changersixMois() {
    this.durer6mois = !this.durer6mois
    this.durer1mois = false
    this.durer3mois = false
    this.durer1anee = false
    this.hideBoutonDateFin = true
    this.contrat.dateFin = ""
    const tmpDate = new Date(this.contrat.dateDebut)
    if (this.durer6mois && tmpDate) {
      tmpDate.setMonth(tmpDate.getMonth() + 6)
      // @ts-ignore
      this.contrat.dateFin = this.datePipe.transform(tmpDate, "yyyy-MM-dd")
    }
  }

  changerUneAnnee() {
    this.durer1anee = !this.durer1anee
    this.durer1mois = false
    this.durer3mois = false
    this.durer6mois = false
    this.hideBoutonDateFin = true
    this.contrat.dateFin = ""
    const tmpDate = new Date(this.contrat.dateDebut)
    if (this.durer1anee && this.contrat.dateDebut) {
      tmpDate.setFullYear(tmpDate.getFullYear() + 1)
      // @ts-ignore
      this.contrat.dateFin = this.datePipe.transform(tmpDate, "yyyy-MM-dd")
    }
    console.log(this.contrat.dateFin)
  }

  annulerChangerMois() {
    this.durer1mois = false
    this.durer3mois = false
    this.durer6mois = false
    this.durer1anee = false
    this.hideBoutonDateFin = false
    this.contrat.dateFin = ""
  }
}
