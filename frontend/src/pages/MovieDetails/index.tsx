import MainButton from 'components/MainButton';
import './styles.scss';
import { ReactComponent as Star } from 'assets/images/star.svg';
const MovieDetails = () => {
  return (
    <main className="movie-details-container">
      <div className="movie-details-title-container">
        <h1 className="movie-details-title">Tela detalhes do filmes</h1>
      </div>

      <div className="search-card">
        <input
          type="text"
          className="search-input"
          placeholder="Deixe sua avaliação aqui"
        />
        <div className="search-btn">
          <MainButton text="SALVAR AVALIAÇÃO" />
        </div>
      </div>

      <div className="movie-comments-container">
        <div className="user-comment">
          <div className="username-container">
            <Star />
            <h4 className="username-comment">Maria Silva</h4>
          </div>
        </div>
        <div className="comment-text-container">
          <span className="comment-text">
            Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco.
          </span>
        </div>
      </div>
    </main>
  );
};

export default MovieDetails;
