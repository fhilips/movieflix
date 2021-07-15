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
	private GenreDTO genre;

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
        genreId = movie.getGenre().getId();
        genre = new GenreDTO(movie.getGenre());
     }


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getSubTitle() {
		return subTitle;
	}


	public void setSubTitle(String subTitle) {
		this.subTitle = subTitle;
	}


	public String getImgUrl() {
		return imgUrl;
	}


	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}


	public String getSynopsis() {
		return synopsis;
	}


	public void setSynopsis(String synopsis) {
		this.synopsis = synopsis;
	}


	public Integer getYear() {
		return year;
	}


	public void setYear(Integer year) {
		this.year = year;
	}


	public Long getGenreId() {
		return genreId;
	}


	public void setGenreId(Long genreId) {
		this.genreId = genreId;
	}
	
	public GenreDTO getGenre() {
        return genre;
    }

    public void setGenre(GenreDTO genre) {
        this.genre = genre;
    }
    
	
}