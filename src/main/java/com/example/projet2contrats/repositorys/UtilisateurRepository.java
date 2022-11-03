package com.example.projet2contrats.repositorys;

import com.example.projet2contrats.models.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<Utilisateur,Long> {

    @Query("select u from Utilisateur u left join fetch u.contrats where u.nom like :nom")
    Optional<Utilisateur> findUtilisateurByNom(@Param("nom") String nom);
}
