import { Component, OnInit } from '@angular/core';
import {Contrat} from "../models/contrat";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-contrats-expirants',
  templateUrl: './contrats-expirants.component.html',
  styleUrls: ['./contrats-expirants.component.css']
})
export class ContratsExpirantsComponent implements OnInit {

  nomCourant : string = ""
  nomChercher = ""
  contrats : Contrat[] = []

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.nomCourant = this.userService.getNomCourrant();
    this.getContratsExpirants()
  }

  deconnecter(){
    this.userService.setLogin(false)
    window.location.href = "/"
  }

  getContratsExpirants(){
    this.userService.getContratsExpirants().subscribe(
      resultat => {
        this.contrats = resultat
      },
      error => {
        console.log("error : "+error)
      }
    )
  }

  getContratsParNomDuClient(){
    this.userService.getContratsExpirantsParNomDuClient(this.nomChercher).subscribe(
      resultat =>{
        this.contrats = resultat
      }
    )
  }

  retourne(){
    window.location.href = "menu"
  }
}
