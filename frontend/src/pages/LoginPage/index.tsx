import MainButton from 'components/MainButton';
import './styles.scss';

import { ReactComponent as MainImage } from 'assets/images/main-image.svg'

const LoginPage = () => {
  return (
    <div className="home-container">
      <section className="home-content">
        <h1 className="home-title">Avalie Filmes</h1>
        <span className="home-text">
          Diga o que você achou do seu filme<br /> favorito
        </span>
        <MainImage />
      </section>

      <div className="login-card-container">
        <h1 className="login-title">LOGIN</h1>
        <div className="login-input-container">
          <input className="login-input" type="email" placeholder="Email" />
          <input className="login-input" type="password" placeholder="Senha" />
        </div>
        <div className="button-container">
          <MainButton text="FAZER LOGIN" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
