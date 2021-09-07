import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { requestBackend } from 'utils/request';

import './styles.scss';

type Movie = {
  id: number;
  title: string;
  subTitle: string;
};

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
      {moviesList?.content.map((movie) => {
        return (
          <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-title">
              {movie.title} id: {movie.id}
              <br/>
          </Link>       
        )
      })}
    </main>
  );
};

export default MovieList;
