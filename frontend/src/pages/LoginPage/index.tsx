import { ReactComponent as MainImage } from 'assets/images/main-image.svg';
import { AuthContext } from 'AuthContext';
import MainButton from 'components/MainButton';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { getTokenData, isAuthenticated } from 'utils/auth';
import {  requestBackendLogin } from 'utils/request';
import { saveAuthData } from 'utils/storage';

import './styles.scss';

type FormData = {
  username: string,
  password: string,
}

type LocationState = {
  from: string
}

const LoginPage = () => {
  const location = useLocation<LocationState>();
  const { from } = location.state || { from: { pathname: '/'} };

  const { setAuthContextData } = useContext(AuthContext);
  const [ hasError, setHasError] = useState(false);
  const { register, handleSubmit } = useForm<FormData>();
  const history = useHistory()

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then(response => {
        saveAuthData(response.data);    
        setHasError(false);    
        console.log("Sucesso! ", response);  
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData()
        })
        history.replace(from);
      })
      .catch(error => {
        setHasError(true);
        console.log("Error! ", error);
      })    
  }

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

      <div className="login-card-container">
        <h1 className="login-title">LOGIN</h1>
        {isAuthenticated() ? 'yes' : 'no'}
        <form className="login-input-container" onSubmit={handleSubmit(onSubmit)}>
          
            <input
              {...register('username')}
              className="login-input"
              type="text"
              name="username"
              placeholder="Email"
            />
            <input
              {...register('password')}
              className="login-input"
              type="password"
              name="password"
              placeholder="Senha"
            />
         
          <div className="button-container">
            <MainButton text="FAZER LOGIN" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
