package com.example.projet2contrats.configuration;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@EnableWebSecurity
@EnableWebMvc
@Configuration
@AllArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
public class SecurityConfig extends WebMvcConfigurerAdapter {

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf()
                .disable()
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers(HttpMethod.GET,"/utilisateurs/{nom}/contrats").authenticated()
                .antMatchers(HttpMethod.GET,"/utilisateurs/{nom}/contrats/{nomClient}").authenticated()
                .antMatchers(HttpMethod.GET, "/utilisateurs/{nom}/contratsExpirant/{nomClient}").authenticated()
                .antMatchers(HttpMethod.GET, "/utilisateurs/{nom}").authenticated()
                .antMatchers(HttpMethod.GET,"/utilisateurs/contrats/{id}").authenticated()
                .antMatchers(HttpMethod.GET, "/utilisateurs/{nom}/contratsExpirants").authenticated()
                .antMatchers(HttpMethod.GET,"/oublierLeMotDePasse/getCourriel/{courriel}").authenticated()
                .antMatchers(HttpMethod.POST,"/utilisateurs").permitAll()
                .antMatchers(HttpMethod.POST,"/utilisateurs/{nom}/create").permitAll()
                .antMatchers(HttpMethod.PUT,"/oublierLeMotDePasse/changeMotDePasse/{courriel}").authenticated()
                .anyRequest()
                .authenticated()
                .and().httpBasic()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        return http.build();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
      //  registry.addMapping("/**");
        registry.addMapping("/*").allowedOrigins("*").allowedMethods("GET", "POST", "OPTIONS", "PUT")
                .allowedHeaders("Content-Type", "X-Requested-With", "accept", "Origin", "Access-Control-Request-Method",
                        "Access-Control-Request-Headers")
                .exposedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Credentials")
                .allowCredentials(true).maxAge(3600);
    }
}

