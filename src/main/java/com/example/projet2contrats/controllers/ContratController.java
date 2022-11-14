package com.example.projet2contrats.controllers;

import com.example.projet2contrats.DTOs.ContratDTO;
import com.example.projet2contrats.DTOs.UtilisateurDTO;
import com.example.projet2contrats.services.ServiceContrat;
import com.example.projet2contrats.services.ServiceUtilisateur;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:4200")
public class ContratController {

    Logger logger = LoggerFactory.getLogger(ContratController.class);
    private ServiceContrat serviceContrat;
    private ServiceUtilisateur serviceUtilisateur;

    public ContratController(ServiceContrat serviceContrat, ServiceUtilisateur serviceUtilisateur) {
        this.serviceContrat = serviceContrat;
        this.serviceUtilisateur = serviceUtilisateur;
    }

    @GetMapping("/utilisateurs/{nom}/contrats")
    public ResponseEntity<List<ContratDTO>> getAllContratParNomUtilisateur(@PathVariable String nom) {

        System.out.println("nom getAllcontrats" +serviceContrat.getContratsParNomUtilisateur(nom));
        return new ResponseEntity<>(serviceContrat.getContratsParNomUtilisateur(nom), HttpStatus.OK);
    }
    @GetMapping("/utilisateurs/{nom}/contrats/{nomClient}")
    public ResponseEntity<List<ContratDTO>> getAllContratParNomUtilisateurEtNomClient(@PathVariable String nom, @PathVariable String nomClient) {
        return new ResponseEntity<>(serviceContrat.getContratsParNomUtilisateurEtNomClient(nom, nomClient), HttpStatus.OK);
    }

    @GetMapping("/utilisateurs/{nom}/contratsExpirant/{nomClient}")
    public ResponseEntity<List<ContratDTO>> getAllContratExpirantParNomUtilisateurEtNomClient(@PathVariable String nom, @PathVariable String nomClient) {
        return new ResponseEntity<>(serviceContrat.getContratsExpirantsParNomUtilisateurEtNomClient(nom, nomClient), HttpStatus.OK);
    }
    @GetMapping("/utilisateurs/{nom}")
    public ResponseEntity<UtilisateurDTO> getUtilisateurParNom(@PathVariable String nom) {
        try{
            UtilisateurDTO utilisateurDTO = serviceUtilisateur.getUtilisateurParNom(nom);
            return ResponseEntity.ok(utilisateurDTO);
        }catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/utilisateurs/contrats/{id}")
    public ResponseEntity<ContratDTO> getContratsParId( @PathVariable long id) {
        return new ResponseEntity<>(serviceContrat.getContratParId( id), HttpStatus.OK);
    }

    @GetMapping("utilisateurs/{nom}/contratsExpirants")
    public ResponseEntity<List<ContratDTO>> getAllContratExpirants(@PathVariable String nom) {
        System.out.println( "expirants : " +serviceContrat.getContratsExpirants(nom));
        return new ResponseEntity<>(serviceContrat.getContratsExpirants(nom), HttpStatus.OK);
    }

    @PostMapping("/utilisateurs")
    public ResponseEntity<UtilisateurDTO> ajouterUtilisateur(@RequestBody UtilisateurDTO utilisateurDTO) {
        System.out.println("post : " + utilisateurDTO);
        if(!serviceUtilisateur.verifierUnique(utilisateurDTO.getNom(),utilisateurDTO.getCourriel())){
            System.out.println("valide courriel : " + HttpStatus.NOT_FOUND);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(serviceUtilisateur.saveUtilisateur(utilisateurDTO), HttpStatus.CREATED);
    }

    @PostMapping("utilisateurs/{nom}/create")
    public ResponseEntity<ContratDTO> ajouterContrat(@RequestBody ContratDTO contratDTO){
        return new ResponseEntity<>(serviceContrat.saveContratDTO(contratDTO),HttpStatus.CREATED);
    }
}
