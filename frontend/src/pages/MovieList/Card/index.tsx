
import { Movie } from 'types/Movies';
import './styles.scss';

type Props = {
  movie: Movie;
}
const Card = ({movie} : Props) => {

  return (
    <main className="movie-card-container base-card">
      <div className="movie-img-container">
        <img className="movie-img" src={movie.imgUrl} alt="Imagem do Filme" />
      </div>       
        <h3 className="movie-card-title">{movie.title}</h3>
        <span className="movie-card-year">{movie.year}</span>
        <span className="movie-card-subtitle">{movie.subTitle}</span>      
    </main>
  );
};

export default Card;
