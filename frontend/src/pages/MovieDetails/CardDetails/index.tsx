import { Movie } from 'types/Movies';
import './styles.scss';

type Props = {
  movie: Movie;
};

const DetailsCard = ({ movie }: Props) => {
  return (
    <main className="details-card-container base-card">
      <div className="details-img-container ">
        <img className="details-img" src={movie.imgUrl} alt="Imagem do Filme" />
      </div>

      <div className="details-content">
        <h3 className="details-card-title">{movie.title}</h3>
        <span className="details-card-year">{movie.year}</span>
        <span className="details-card-subtitle">{movie.subTitle}</span>
        <div className="details-card-synopsis">{movie.synopsis}</div>
      </div>
    </main>
  );
};

export default DetailsCard;
