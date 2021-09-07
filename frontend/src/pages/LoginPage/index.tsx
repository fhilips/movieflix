import { ReactComponent as MainImage } from 'assets/images/main-image.svg';
import { AuthContext } from 'AuthContext';
import MainButton from 'components/MainButton';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { getTokenData } from 'utils/auth';
import { requestBackendLogin } from 'utils/request';
import { saveAuthData } from 'utils/storage';

import './styles.scss';

type CredentialsDTO = {
  username: string;
  password: string;
};

type LocationState = {
  from: string;
};

const LoginPage = () => {
  const location = useLocation<LocationState>();
  const { from } = location.state || { from: { pathname: '/movies' } };

  const { setAuthContextData } = useContext(AuthContext);

  const [hasError, setHasError] = useState(false);

  const { register, handleSubmit, formState: {errors} } = useForm<CredentialsDTO>();

  const history = useHistory();

  const onSubmit = (formData: CredentialsDTO) => {
    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        setHasError(false);
        console.log('Sucesso! ', response);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        });
        history.replace(from);
      })
      .catch((error) => {
        setHasError(true);
        console.log('Error! ', error);
      });
  };

  return (
    <div className="home-container">
      <section className="home-content">
        <h1 className="home-title">Avalie Filmes</h1>
        <span className="home-text">
          Diga o que você achou do seu filme
          <br /> favorito
        </span>
        <MainImage />
      </section>

      <div className="login-card-container base-card">
        <form
          className="login-input-container"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="login-title">LOGIN</h1>
          <div className="input-container">
            <input
              {...register('username', {
                required: 'Campo obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido'
                }
              })}
              className={`login-input ${errors.username ? 'is-invalid' : ''}`}
              type="text"
              name="username"
              placeholder="Email"
            />
            <div className="invalid-feedback d-block">
                  {errors.username?.message}
            </div>
            <input
              {...register('password', {
                required: 'Campo obrigatório'                
                })}
              className="login-input"
              type="password"
              name="password"
              placeholder="Senha"
            />
             <div className="invalid-feedback d-block">
                  {errors.password?.message}
            </div>
          </div>

          <div className="button-container">
            <MainButton text="FAZER LOGIN" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
