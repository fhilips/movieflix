import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from 'types/Movies';
import { requestBackend } from 'utils/request';
import MovieCard from './MovieCard';

import './styles.scss';

type movieList = {
  content: Movie[];
};

const MovieList = () => {
  const [moviesList, setMoviesList] = useState<movieList>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: '/movies',
      withCredentials: true,
      params: {
        page: 0,
        size: 12,
      },
    };
    requestBackend(params).then((response) => {
      setMoviesList(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <main className="movie-list-container">
      <h1 className="movie-list-title">Tela listagem de filmes</h1>
      <div className="row">
      {moviesList?.content.map((movie) => {
        return (
          <Link
            className="col-sm-6 col-md-6 col-xl-3"
            to={`/movies/${movie.id}`}
            key={movie.id}            
          >
            <MovieCard movie={movie} key={movie.id} />
          </Link>
        );
      })}

      </div>
      
    </main>
  );
};

export default MovieList;

