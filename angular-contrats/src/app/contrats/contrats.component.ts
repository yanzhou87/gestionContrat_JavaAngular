import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Contrat} from "../models/contrat";

@Component({
  selector: 'app-contrats',
  templateUrl: './contrats.component.html',
  styleUrls: ['./contrats.component.css']
})
export class ContratsComponent implements OnInit {

  nomCourant: string = ""
  nomChercher = ""
  contrats: Contrat[] = []

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.nomCourant = this.userService.getNomCourrant();
    this.getContrats()
  }

  deconnecter() {
    this.userService.setLogin(false)
    window.location.href = "/"
  }

  getContrats() {
    this.userService.getContrats().subscribe({
        next: value => {
          this.contrats = value
        },
        error: erreur => {

        }
      }
    )
  }

  getContratsParNomDuClient() {
    this.userService.getContratsParNomDuClient(this.nomChercher).subscribe(
      resultat => {
        this.contrats = resultat
      }
    )
  }

  saveContratId(id: number) {
    this.userService.getContratParId(id)
    window.location.href = "contrat"
  }

  retourne(){
    window.location.href = "menu"
  }
}
