import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Contrat} from "../models/contrat";

@Component({
  selector: 'app-contrats',
  templateUrl: './contrats.component.html',
  styleUrls: ['./contrats.component.css']
})
export class ContratsComponent implements OnInit {

  nomCourant : string = ""
  nomChercher = ""
  contrats : Contrat[] = []

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.nomCourant = this.userService.getNomCourrant();
    this.getContrats()
  }

  deconnecter(){
    this.userService.setLogin(false)
  }

  getContrats(){
    this.userService.getContrats().subscribe(
      resultat => {
        this.contrats = resultat
      }
    )
  }

  getContratsParNomDuClient(){
    this.userService.getContratsParNomDuClient(this.nomChercher).subscribe(
      resultat =>{
        this.contrats = resultat
      }
    )
  }
}
