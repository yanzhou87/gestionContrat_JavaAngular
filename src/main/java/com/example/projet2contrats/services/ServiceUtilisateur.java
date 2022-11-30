package com.example.projet2contrats.services;

import com.example.projet2contrats.DTOs.UtilisateurDTO;
import com.example.projet2contrats.models.Contrat;
import com.example.projet2contrats.models.Utilisateur;
import com.example.projet2contrats.repositorys.UtilisateurRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ServiceUtilisateur {
    private UtilisateurRepository utilisateurRepository;

    public ServiceUtilisateur(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    public UtilisateurDTO getUtilisateurParNom(String nom) throws Exception {

        Optional<Utilisateur> utilisateur = utilisateurRepository.findUtilisateurByNom(nom);
        if (utilisateur.isEmpty()){
            throw new Exception();
        }
        UtilisateurDTO utilisateurDTO = new UtilisateurDTO(utilisateur.get().getId(),utilisateur.get().getNom(),
                utilisateur.get().getMotDePasse(),utilisateur.get().getCourriel());
        return utilisateurDTO;
    }

    public UtilisateurDTO saveUtilisateur(UtilisateurDTO utilisateurDTO) {
        List<Contrat> contrats = new ArrayList<>();

        Utilisateur utilisateur = new Utilisateur(utilisateurDTO.getNom()
                    ,utilisateurDTO.getMotDePasse(), utilisateurDTO.getCourriel(), contrats);

        Utilisateur utilisateur1 = utilisateurRepository.save(utilisateur);

        UtilisateurDTO utilisateurDTO1 = new UtilisateurDTO(utilisateur1.getId(), utilisateur1.getNom(),
                    utilisateur1.getCourriel(), utilisateur1.getMotDePasse());

        return utilisateurDTO1;
    }

    public Utilisateur saveU(Utilisateur utilisateur) {
        List<Contrat> contrats = new ArrayList<>();
        utilisateur.setContrats(contrats);
        contrats.stream().forEach((contrat -> contrat.setUtilisateur(utilisateur)));
        Utilisateur utilisateur1 = utilisateurRepository.save(utilisateur);

        return utilisateur1;
    }

    public boolean verifierUnique(String nom,String courriel){
        List<Utilisateur> utilisateurs =utilisateurRepository.findAll();
        if(utilisateurs.isEmpty()){
            return true;
        }
        boolean courrielUnique = true;
        boolean nomlUnique = true;
        for(Utilisateur utilisateur : utilisateurs){
            if (utilisateur.getNom().equals(nom)) {
                nomlUnique = false;
            }
            if(utilisateur.getCourriel().equals(courriel)){
                courrielUnique = false;
            }
        }
        System.out.println(courrielUnique);
        System.out.println(nomlUnique);
        return courrielUnique && nomlUnique;
    }

    public Utilisateur getUtilisateurParNomPourContrats(String nom) {
        Utilisateur utilisateur = utilisateurRepository.findUtilisateurByNom(nom).get();
        return utilisateur;
    }

    public List<Utilisateur> findAll() {
        return utilisateurRepository.findAll();
    }

    public boolean getCourrielExiste(String courriel) {
        Optional<Utilisateur> utilisateur = utilisateurRepository.findUtilisateurByCourriel(courriel);
        if (utilisateur.isEmpty()){
            return false;
        }
        return true;
    }

    public boolean changeMotDePasse(String courriel, String motDePasse) {
        Optional<Utilisateur> utilisateur = utilisateurRepository.findUtilisateurByCourriel(courriel);
        if (utilisateur.isEmpty()){
            return false;
        }
        utilisateur.get().setMotDePasse(motDePasse);
        utilisateurRepository.save(utilisateur.get());
        return true;
    }
}
