package com.example.projet2contrats.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UtilisateurDTO {

    private long id;
    public String nom;
    private String motDePasse;
    private String courriel;

    private String token;
    public UtilisateurDTO(String nom, String motDePasse, String courriel, UUID token ) {
        this.nom = nom;
        this.motDePasse = motDePasse;
        this.courriel = courriel;
        this.token = token.toString();
    }

    public String getNom() {
        return nom;
    }
}
