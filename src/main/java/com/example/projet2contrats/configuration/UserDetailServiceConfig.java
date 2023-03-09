package com.example.projet2contrats.configuration;

import com.example.projet2contrats.models.Utilisateur;
import com.example.projet2contrats.repositorys.UtilisateurRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@Configuration
public class UserDetailServiceConfig implements UserDetailsService{

    private UtilisateurRepository utilisateurRepository;

//    @Bean
//    public UserDetailsService userDetailsService(BCryptPasswordEncoder bCryptPasswordEncoder) {
//        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
//        manager.createUser(User.withUsername("user")
//          .password(bCryptPasswordEncoder.encode("userPass"))
//          .roles("USER")
//          .build());
//        manager.createUser(User.withUsername("admin")
//          .password(bCryptPasswordEncoder.encode("adminPass"))
//          .roles("ADMIN", "USER")
//          .build());
//        return manager;
//    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Utilisateur> utilisateur = utilisateurRepository.findUtilisateurByNom(username);
        if(utilisateur.isEmpty()){
            throw new UsernameNotFoundException("Non trouve" + username);
        }
        String motDePasse = utilisateur.get().getMotDePasse();
        String token = utilisateur.get().getToken();
        return new User(username,motDePasse, AuthorityUtils.commaSeparatedStringToAuthorityList(token));
    }
}
