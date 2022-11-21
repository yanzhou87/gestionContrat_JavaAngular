import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Contrat} from "../models/contrat";
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";

@Component({
  selector: 'app-creer-contrat',
  templateUrl: './creer-contrat.component.html',
  styleUrls: ['./creer-contrat.component.css']
})
export class CreerContratComponent implements OnInit {

  contrat : Contrat = {
    id: 0,
    nom: "",
    dateDebut:"",
    dateFin: "",
    nomClient: "",
    montant: 0,
    modeDuPaiement: ""
  }
  erreurPourNomClient: boolean = false
  erreurPourDateDebut: boolean = false
  erreurPourDateFin: boolean = false
  erreurPourMontant: boolean = false
  erreurPourModeDuPaiement: boolean = false
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  validePourLesChamps(){

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
  changerPage(){

    window.location.href = "/menu"
  }
}
