package com.devsuperior.movieflix.dto;

import java.io.Serializable;

import com.devsuperior.movieflix.entities.Movie;

public class MovieDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
	private String title;
	private String subTitle;
	private String imgUrl;
	private String synopsis;
	private Integer year;
	
	private Long genreId;

    public MovieDTO(){
    }      
    

    public MovieDTO(Long id, String title, String subTitle, String imgUrl, String synopsis, Integer year,
			Long genreId) {
		super();
		this.id = id;
		this.title = title;
		this.subTitle = subTitle;
		this.imgUrl = imgUrl;
		this.synopsis = synopsis;
		this.year = year;
		this.genreId = genreId;
	}


	public MovieDTO(Movie movie) {
        id = movie.getId();
        title = movie.getTitle();
        subTitle = movie.getSubTitle();
        imgUrl = movie.getImgUrl();
        synopsis = movie.getSynopsis();
        year = movie.getYear();
       }

    
	
}