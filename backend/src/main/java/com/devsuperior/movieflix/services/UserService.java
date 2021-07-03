package com.devsuperior.movieflix.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.UserRepository;
import com.devsuperior.movieflix.services.exceptions.ForbiddenException;




@Service
public class UserService implements UserDetailsService {

	private static Logger logger = LoggerFactory.getLogger(UserService.class);
	
	@Autowired
	private UserRepository repository;
	
    @Transactional(readOnly = true)
    public User authenticated() throws Exception {
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            System.out.println(username);
            return repository.findByEmail(username);
        }catch (Exception e) {
            throw new UsernameNotFoundException("Usuario Inválido");
        }
    }    
    public boolean isAuthenticated() {
    	boolean isAuthenticated = SecurityContextHolder.getContext().getAuthentication().isAuthenticated();
    	if(isAuthenticated) {
    		return true;
    	} else {
    		throw new ForbiddenException("Não esta autenticado!");
    	}
    	
    }


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user = repository.findByEmail(username);
		if (user == null) {
			logger.error("User not found: " + username);
			throw new UsernameNotFoundException("email não encontrado");
		}
		logger.info("User found: " + username);
		return user;
	}
}
