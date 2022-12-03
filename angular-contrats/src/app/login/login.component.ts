import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nom: string = ""
  motDePasse: string = ""
  erreurPourMotDePasse: boolean = false
  erreurPourNom: boolean = false

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
  }

  getUtilisateur(): void {
    this.userService.getUtilisateurParNom(this.nom, this.motDePasse)
    .subscribe({
      next: user => {
        if (user.motDePasse != this.motDePasse) {
          this.erreurPourMotDePasse = true
          this.erreurPourNom = false
        } else {
          this.nom = ""
          this.motDePasse = ""
          this.erreurPourMotDePasse = false
          this.erreurPourNom = false
        }
      },
      error: repondre => {
        if (repondre.status == 404) {
          this.erreurPourNom = true
          this.erreurPourMotDePasse = false
        }
      }
    });
  }

  getLogin(): boolean {
    return this.userService.getLogin()
  }
}
