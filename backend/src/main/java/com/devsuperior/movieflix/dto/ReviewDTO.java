package com.devsuperior.movieflix.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;

public class ReviewDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    @NotBlank
	private String text;
	
	private Long movieId;
	private UserDTO user;

    public ReviewDTO(){
    }

	public ReviewDTO(Long id, String text, Long movieId, User user) {		
		this.id = id;
		this.text = text;
		this.movieId = movieId;
		this.user = new UserDTO(user.getId(), user.getName(), user.getEmail());
	}
	public ReviewDTO(Review entity){
		this.id = entity.getId();
		this.text = entity.getText();
		this.movieId = entity.getMovie().getId();
		this.user = new UserDTO(
							entity.getUser().getId(),
							entity.getUser().getName(),
							entity.getUser().getEmail());
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Long getMovieId() {
		return movieId;
	}

	public void setMovieId(Long movieId) {
		this.movieId = movieId;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}   


}