package com.devsuperior.movieflix.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    	
    	Optional<Movie> movie = repository.findById(id)    			;
    	return new MovieDTO(movie.get());
    }


	@Transactional(readOnly = true)
	public Page<MovieDTO> findAllPaged(Long genreId, PageRequest pageRequest) {		
		Genre genre = (genreId == 0) ? null : genreRepository.getOne(genreId);		
		Page<Movie> movieList = repository.find(genre, pageRequest);		
		return movieList.map(x -> new MovieDTO(x));		
	}
	
}
