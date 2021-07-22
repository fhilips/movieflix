package com.devsuperior.movieflix.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.entities.Genre;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.repositories.GenreRepository;
import com.devsuperior.movieflix.repositories.MovieRepository;


@Service
public class MovieService {

	@Autowired
	private MovieRepository repository;
	
	@Autowired
	private GenreRepository genreRepository;
	
    @Transactional(readOnly = true)
    public MovieDTO findById(Long id) throws Exception {
    	
    	Optional<Movie> movie = repository.findById(id);
    	Movie entity = movie.orElseThrow(() -> new EntityNotFoundException("Entity not found"));
    	return new MovieDTO(entity);
    }


	@Transactional(readOnly = true)
	public Page<MovieDTO> findAllPaged(Long genreId, Pageable pageable) {		
		Genre genre = (genreId == 0) ? null : genreRepository.getOne(genreId);		
		Page<Movie> movieList = repository.find(genre, pageable);		
		return movieList.map(x -> new MovieDTO(x));		
	}
	
}
