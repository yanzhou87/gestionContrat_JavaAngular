package com.example.projet2contrats;

import com.example.projet2contrats.DTOs.ContratDTO;
import com.example.projet2contrats.DTOs.UtilisateurDTO;
import com.example.projet2contrats.models.Contrat;
import com.example.projet2contrats.models.Utilisateur;
import com.example.projet2contrats.services.ServiceContrat;
import com.example.projet2contrats.services.ServiceUtilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;
import java.util.List;

@SpringBootApplication
public class Projet2ContratsApplication implements CommandLineRunner {
    @Autowired
    private ServiceContrat serviceContrat;
    @Autowired
    private ServiceUtilisateur serviceUtilisateur;
    public static void main(String[] args) {
        SpringApplication.run(Projet2ContratsApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        LocalDate debut = LocalDate.now();
        LocalDate fin = LocalDate.now().plusDays(2);
        LocalDate fin1 = LocalDate.now().plusDays(15);
        LocalDate fin2 = LocalDate.now().plusDays(45);
        LocalDate fin3 = LocalDate.now().plusDays(10);

        List<ContratDTO> contratDTOS = serviceContrat.getContratsParNomUtilisateur("Yan Zhou");

        //  System.out.println(serviceContrat.getAllContrats());

        UtilisateurDTO utilisateurDTO = new UtilisateurDTO( "Yan Yan", "123456","yan@gmail.com");
        UtilisateurDTO utilisateurDTO1 = serviceUtilisateur.saveUtilisateur(utilisateurDTO);
        System.out.println(utilisateurDTO1);
        Utilisateur utilisateur = serviceUtilisateur.getUtilisateurParNomPourContrats("Yan Yan");
        Contrat contrat2 = serviceContrat.saveContrat(new Contrat(utilisateur.getNom(), debut, fin2,500,"client 1"));
        Contrat contrat3 = serviceContrat.saveContrat(new Contrat(utilisateur.getNom(), debut, fin3,500, "client 2"));
        utilisateur.addContrats(contrat2);
        utilisateur.addContrats(contrat3);
        Contrat contrat4 = serviceContrat.saveContrat(new Contrat(utilisateur.getNom(), debut, fin,500,"client 1"));
        Contrat contrat5 = serviceContrat.saveContrat(new Contrat(utilisateur.getNom(), debut, fin1,500, "client 3"));
        utilisateur.addContrats(contrat4);
        utilisateur.addContrats(contrat5);
        System.out.println(serviceContrat.getAllContrats());

        Utilisateur utilisateur23 = new Utilisateur("yan","123456","yanxx@gmail.com");
        Utilisateur utilisateurr = serviceUtilisateur.saveU(utilisateur23);
        System.out.println(utilisateurr);
    }
}
