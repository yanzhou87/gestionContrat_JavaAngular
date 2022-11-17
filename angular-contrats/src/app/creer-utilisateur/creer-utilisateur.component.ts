import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-creer-utilisateur',
  templateUrl: './creer-utilisateur.component.html',
  styleUrls: ['./creer-utilisateur.component.css']
})
export class CreerUtilisateurComponent implements OnInit {
  nom: string = "";
  courriel : string = ""

  motDePasse: string = "";
  verifierMotDePasse: string = "";
  erreurPourNom: boolean = false;
  erreurPourCourriel: boolean = false;
  erreurPourMotDePasse: boolean = false;
  erreurPourVerifierMotDePasse: boolean = false;
  erreurDeUnique: boolean = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {

  }

  validePourLesChamps() {
    if (this.nom == "" || this.nom.length < 2) {
      this.erreurPourNom = true
    } else {
      this.erreurPourNom = false
    }
    if (this.courriel.match(new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'))) {
      this.erreurPourCourriel = false;
      console.log("valide : " + this.courriel)
    } else {
      console.log("invalide : " + this.courriel)
      this.erreurPourCourriel = true;
    }

    if (this.motDePasse.length < 6) {
      this.erreurPourMotDePasse = true
    } else {
      this.erreurPourMotDePasse = false;
    }
    console.log("this.verifierMotDePasse != this.motDePasse" + this.verifierMotDePasse == this.motDePasse)
    console.log("mot de passe: " + this.motDePasse)
    console.log("vérifier le mot de passe " + this.verifierMotDePasse)
    if (this.verifierMotDePasse != this.motDePasse) {
      this.erreurPourVerifierMotDePasse = true
    } else {

      this.erreurPourVerifierMotDePasse = false
    }
  }

  postUtilisateur() {
    this.validePourLesChamps();
    if (!this.erreurPourNom && !this.erreurPourCourriel && !this.erreurPourMotDePasse && !this.erreurPourVerifierMotDePasse) {
      this.userService.postUnUtilisateur(this.nom, this.motDePasse, this.courriel)
        .subscribe({
            next: value => {
              this.nom = ""
              this.courriel = ""
              this.motDePasse = ""
              this.verifierMotDePasse = ""
              window.location.href = "/"
            },
            error: repondre => {
              this.erreurDeUnique = true;
            }
          }
        )
    }
  }
}
