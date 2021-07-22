package com.devsuperior.movieflix.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.dto.UserDTO;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.repositories.ReviewRepository;


@Service
public class ReviewService {

	
	@Autowired
	private ReviewRepository repository;
		
	@Autowired
	private MovieRepository movieRepository;
	
	@Autowired
	private UserService userService;	
	
    @Transactional(readOnly = true)
    public ReviewDTO insert(ReviewDTO dto) throws Exception {
    	Optional<Movie> movie = movieRepository.findById(dto.getMovieId());    	
    	Movie movieEntity = movie.orElseThrow(() -> new EntityNotFoundException("Entity not found"));
    	User currentUser = userService.authenticated();
    	
    	Review review = new Review(dto.getText(), movieEntity, currentUser);    	
    	
    	repository.save(review);
    	dto.setId(review.getId());
    	dto.setUser(new UserDTO(currentUser.getId(), currentUser.getName(), currentUser.getEmail()));
    	return dto;
    }
}
