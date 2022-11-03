package com.example.projet2contrats.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContratDTO {

    private long id;
    private String nom;
    private String dateDebut;
    private String dateFin;
    private String nomClient;
    private float montant;
    private String modeDuPaiement;
}
