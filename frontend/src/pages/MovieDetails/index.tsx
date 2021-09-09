import MainButton from 'components/MainButton';
import './styles.scss';

import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { requestBackend, requestBackendReviews } from 'utils/request';
import { hasAnyRoles } from 'utils/auth';
import ReviewCard from './ReviewCard';
import { Review } from 'types/Reviews';
import { useForm } from 'react-hook-form';
import CardDetails from './CardDetails';
import { Movie } from 'types/Movies';
import { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';


type UrlParams = {
  movieId: string;  
};

type FormReviewData = {
  text: string,    
  movieId: string;
}

type MovieReviewList = Review[];

const MovieDetails = () => {
  const { movieId } = useParams<UrlParams>();

  const [movieReviews, setMovieReviews] = useState<MovieReviewList>();

  const [movie, setMovie] = useState<Movie>();

  const { register, handleSubmit, setValue } = useForm<FormReviewData>();

  const getMovie = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: `/movies/${movieId}`,
      withCredentials: true,     
    };
    requestBackend(params).then((response) => {
      setMovie(response.data);
      console.log(response.data);
    });
  }, [movieId])

  const getMovieReviews = useCallback(() => {
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
  }, [movieId])

  useEffect(() => {
    getMovieReviews();
    getMovie();
  }, [getMovie, getMovieReviews]);

  const onSubmit = (formData: FormReviewData) => {
    formData.movieId = movieId;
    console.log(formData)
    requestBackendReviews(formData)
      .then(() => {        
        console.log("sucesso");
        setValue('text', '');
        toast.success('Comentário salvo com sucesso!', {
          position: "top-center"          
          });
        getMovieReviews();        
      })
      .catch(error => {       
        console.log("Error! ", error);
        toast.error('Não é permitido texto vazio na avaliação!', {
          position: "top-center"      
          });

      })            
  };

  return (
    <main className="movie-details-container">
      <div className="card-details">
        {movie && <CardDetails movie={movie}/>}
      </div>
    
      

      {hasAnyRoles(['ROLE_MEMBER']) && (
        <div className="search-card base-card">
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

      <div className="movie-reviews-container base-card">
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
