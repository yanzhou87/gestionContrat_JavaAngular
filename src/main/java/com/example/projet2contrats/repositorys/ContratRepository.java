package com.example.projet2contrats.repositorys;

import com.example.projet2contrats.models.Contrat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ContratRepository extends JpaRepository<Contrat, Long> {
    @Query("select c from Contrat c where c.nom like :nom and c.nomClient like %:nomClient%")
    List<Contrat> findContratsParNomClient(String nom, String nomClient);
}
