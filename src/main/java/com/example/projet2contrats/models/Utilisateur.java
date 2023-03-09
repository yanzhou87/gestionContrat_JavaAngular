package com.example.projet2contrats.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "utilisateur", schema = "public")
public class Utilisateur {
    @Id
   // @GeneratedValue(strategy = GenerationType.AUTO)
    @GeneratedValue(generator = "utilisateur_seq")
    private long id;

    private String nom;
    private String motDePasse;
    private String courriel;

    private String token;

    @OneToMany(mappedBy = "utilisateur", cascade = CascadeType.ALL)
    private List<Contrat> contrats;

    public Utilisateur(String nom, String motDePasse, String courriel, UUID token) {
        this.nom = nom;
        this.motDePasse = motDePasse;
        this.courriel = courriel;
        this.token = token.toString();
    }

    public Utilisateur(String nom, String motDePasse, String courriel, List<Contrat> contrats, UUID token ) {
        this.nom = nom;
        this.motDePasse = motDePasse;
        this.courriel = courriel;
        this.contrats = contrats;
        this.token = token.toString();
    }

    public Utilisateur(String username, String motDePasse, List<GrantedAuthority> commaSeparatedStringToAuthorityList) {
        this.nom = username;
        this.motDePasse = motDePasse;
        this.token = commaSeparatedStringToAuthorityList.toString();
    }

    public void addContrats(Contrat contrat) {
        contrats.add(contrat);
        contrat.setUtilisateur(this);
    }

    @Override
    public String toString() {
        return "Utilisateur{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", motDePasse='" + motDePasse + '\'' +
                ", courriel='" + courriel + '\'' +
                ", contrats=" + contrats +
                ", token=" + token +
                '}';
    }
}

