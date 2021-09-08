import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Genre } from 'types/Genre';
import { Movie } from 'types/Movies';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'utils/request';
import MovieCard from './Card';
import Filter from './Filter';

import './styles.scss';

type movieListPage = {
  content: Movie[];
  totalPages: number;
};

type ControlComponentsData = {
  activePage: number;
}

const MovieList = () => {  
  const [moviesList, setMoviesList] = useState<movieListPage>();

  const [genreId, setGenreId] = useState<number>();

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,      
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({activePage: pageNumber});
  }

  const getMovies = useCallback((genreId?: number) => {
    const params: AxiosRequestConfig = {
      url: '/movies',
      withCredentials: true,
      params: {
        page: controlComponentsData.activePage,
        size: 4,
        genreId: genreId,
      },
    };
    requestBackend(params).then((response) => {
      setMoviesList(response.data);
      console.log(response.data);
    });
  }, [controlComponentsData])

  useEffect(() => {
    getMovies(genreId);
  }, [getMovies, genreId]);

  const onChangeGenre = (genreId : number) => {
    setGenreId(genreId);
  }

  return (
    <main className="movie-list-container">
      <div className="filter-container base-card">
        <Filter onChangeGenre={onChangeGenre} />
      </div>
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
        <Pagination 
          pageCount={moviesList ? moviesList?.totalPages : 0} 
          range={3}
          onChange={handlePageChange}
          />
      </div>
    </main>
  );
};

export default MovieList;
