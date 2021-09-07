import MainButton from 'components/MainButton';
import './styles.scss';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { requestBackend, requestBackendReviews } from 'utils/request';
import { hasAnyRoles } from 'utils/auth';
import ReviewCard from './ReviewCard';
import { Review } from 'types/Reviews';
import { useForm } from 'react-hook-form';

type UrlParams = {
  movieId: string;  
};

type FormData = {
  text: string,    
  movieId: string;
}

type MovieReviewList = Review[];

const MovieDetails = () => {
  const { movieId } = useParams<UrlParams>();

  const [movieReviews, setMovieReviews] = useState<MovieReviewList>();

  const [newReview, setNewReview] = useState(false);

  const { register, handleSubmit } = useForm<FormData>();

  useEffect(() => {
    const reviewsParams = {
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
      params: {
        page: 0,
        size: 12,
      },
    };
    requestBackend(reviewsParams).then((response) => {
      console.log(response.data);
      setMovieReviews(response.data);
    });
  }, [movieId, newReview]);

  const onSubmit = (formData: FormData) => {
    formData.movieId = movieId;
    console.log(formData)
    requestBackendReviews(formData)
      .then(() => {        
        console.log("sucesso");
        setNewReview(true);
      })
      .catch(error => {       
        console.log("Error! ", error);
      })        
      setNewReview(false);
  };

  return (
    <main className="movie-details-container">
      <div className="movie-details-title-container">
        <h1 className="movie-details-title">
          Tela detalhes do filme Id: {movieId}
        </h1>
      </div>

      {hasAnyRoles(['ROLE_MEMBER']) && (
        <div className="search-card">
          <div className="search-form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
               {...register('text')}
               className="search-input"
               type="text"
               name="text"      
               placeholder="Deixe sua avaliação aqui"
              />
              <MainButton text="SALVAR AVALIAÇÃO" />
            </form>
          </div>
        </div>
      )}

      <div className="movie-reviews-container">
        {movieReviews?.length !== 0 ? (
          movieReviews?.map((movieReview) => {
            return (
              <ReviewCard movieReview={movieReview} key={movieReview.id} />
            );
          })
        ) : (
          <span className="with-no-reviews-title">
            O filme ainda não possui avaliações!
          </span>
        )}
      </div>
    </main>
  );
};

export default MovieDetails;
