import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-creer-utilisateur',
  templateUrl: './creer-utilisateur.component.html',
  styleUrls: ['./creer-utilisateur.component.css']
})
export class CreerUtilisateurComponent implements OnInit {
  nom: string = "";
  courriel: string = "";
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
    if (this.courriel == "") {
      this.erreurPourCourriel = true;
    } else {
      this.erreurPourCourriel = false;
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
