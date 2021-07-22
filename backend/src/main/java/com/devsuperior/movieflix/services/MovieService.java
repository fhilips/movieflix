package com.devsuperior.movieflix.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Genre;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.repositories.GenreRepository;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.repositories.ReviewRepository;


@Service
public class MovieService {

	@Autowired
	private MovieRepository repository;
	
	@Autowired
	private GenreRepository genreRepository;
	
	
	@Autowired
	private ReviewRepository reviewRepository;
	
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


	public List<ReviewDTO> findMovieReviewsById(Long id) {
		
		List<Review> findMovieReviewsById = reviewRepository.findMovieReviewsById(id);
		
		return findMovieReviewsById.stream().map(x -> new ReviewDTO(x)).collect(Collectors.toList());
	}
	
}
