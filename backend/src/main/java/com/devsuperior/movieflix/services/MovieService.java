package com.devsuperior.movieflix.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.repositories.MovieRepository;




@Service
public class MovieService {

	@Autowired
	private MovieRepository repository;
	
    @Transactional(readOnly = true)
    public MovieDTO findById(Long id) throws Exception {
    	
    	Optional<Movie> movie = repository.findById(id)    			;
    	return new MovieDTO(movie.get());
    }
	
}
