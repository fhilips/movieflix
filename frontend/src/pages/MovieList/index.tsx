import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from 'types/Movies';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'utils/request';
import MovieCard from './MovieCard';

import './styles.scss';

type movieListPage = {
  content: Movie[];
  totalPages: number;
};

const MovieList = () => {
  // const [moviesList, setMoviesList] = useState<SpringPage<movieListPage>>();
  const [moviesList, setMoviesList] = useState<movieListPage>();

  const getMovies = useCallback((pageNumber: number) => {
    const params: AxiosRequestConfig = {
      url: '/movies',
      withCredentials: true,
      params: {
        page: pageNumber,
        size: 4,
      },
    };
    requestBackend(params).then((response) => {
      setMoviesList(response.data);
      console.log(response.data);
    });
  }, [])

  useEffect(() => {
    getMovies(0)
  }, [getMovies]);

  return (
    <main className="movie-list-container">
      <h1 className="movie-list-title">Tela listagem de filmes</h1>
      <div className="row">
        {moviesList?.content.map((movie) => {
          return (
            <Link
              className="col-sm-6 col-md-6 col-xl-3"
              to={`/movies/${movie}`}
              key={movie.id}
            >
              <MovieCard movie={movie} key={movie.id} />
            </Link>
          );
        })}
        <Pagination 
          pageCount={(moviesList) ? moviesList?.totalPages : 0} 
          range={3}
          onChange={getMovies}
          />
      </div>
    </main>
  );
};

export default MovieList;
