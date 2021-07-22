package com.devsuperior.movieflix.resources;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.services.ReviewService;

@RestController
@RequestMapping(value = "/reviews")
public class ReviewResources {

	@Autowired
	private ReviewService service;
	
	@PostMapping 
    public ResponseEntity<ReviewDTO> newReview(@Valid @RequestBody ReviewDTO dto) throws Exception {		
		
		ReviewDTO reviewDTO = service.insert(dto);
		
		URI uri = ServletUriComponentsBuilder
				.fromCurrentRequest().path("/reviews").buildAndExpand(reviewDTO.getId()).toUri();
		return ResponseEntity.created(uri).body(reviewDTO);       
      
    }
}
