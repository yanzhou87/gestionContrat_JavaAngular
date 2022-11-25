import { Component, OnInit } from '@angular/core';
import {Contrat} from "../models/contrat";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.css']
})
export class ContratComponent implements OnInit {

  nomCourant : string = ""
  contrat : Contrat = {
    id: 0,
    nom: "",
    dateDebut: "",
    dateFin:"",
    nomClient: "",
    montant: 0,
    modeDuPaiement: ""
  }
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.nomCourant = this.userService.getNomCourrant();
    this.userService.getContrat().subscribe(
      {
        next:value =>{
         this.contrat = value
        }
      }
    )
    // this.userService.getContratParId().subscribe(
    //   {
    //     next: value => {
    //       console.log(value)
    //       this.contrat = value
    //     },
    //     error: erreur =>{
    //
    //     }
    //   }
    // )
  }

  deconnecter(){
    this.userService.setLogin(false)
    window.location.href = "/"
  }
}
