package com.devsuperior.movieflix.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.movieflix.dto.UserDTO;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.services.UserService;

@RestController
@RequestMapping(value = "/users")
public class UserResources {

	@Autowired
	private UserService service;
	
	@GetMapping("/profile")    
    public ResponseEntity<UserDTO> getProfile() throws Exception{

		
		User user = service.authenticated();
		
		UserDTO dto = new UserDTO(user);
       
        return ResponseEntity.ok().body(dto);
    }
}
