import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-oublier-mot-de-passe',
  templateUrl: './oublier-mot-de-passe.component.html',
  styleUrls: ['./oublier-mot-de-passe.component.css']
})

export class OublierMotDePasseComponent implements OnInit {
  courriel: string = ""
  motDePasse: string = "";
  verifierMotDePasse: string = "";
  erreurPourMotDePasse: boolean = false;
  erreurPourVerifierMotDePasse: boolean = false;
  changeMotDePasse : boolean = false
  erreurPourCourriel: boolean = false
  messageChanger : string = ""
  hide = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  getCourriel(){
    this.userService.getCourriel(this.courriel).subscribe(
      {
        next: value => {
          this.changeMotDePasse = true
          this.erreurPourCourriel = false
        },
        complete: () => {
          this.changeMotDePasse = true
          this.erreurPourCourriel = false
        },
        error: err => {
          if(err.status == 404){
            this.erreurPourCourriel = true
          }
        }
      }
    )
  }

  changerMotDePasse() {
    if (this.motDePasse.length < 6) {
      this.erreurPourMotDePasse = true
    }
    if (this.motDePasse != this.verifierMotDePasse) {
      this.erreurPourVerifierMotDePasse = true;
    }
    if (this.motDePasse == this.verifierMotDePasse){
      this.userService.putMotDePasse(this.motDePasse, this.courriel).subscribe(
        {
          next : value => {
            this.messageChanger = "C'est changé !!!"
            this.erreurPourMotDePasse = false
            this.erreurPourVerifierMotDePasse = false
          }
        }
      )
    }
  }
}
