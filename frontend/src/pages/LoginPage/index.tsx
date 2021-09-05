import { ReactComponent as MainImage } from 'assets/images/main-image.svg';
import MainButton from 'components/MainButton';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { requestBackendLogin, saveAuthData } from 'utils/request';
import './styles.scss';

type FormData = {
  username: string,
  password: string,
}

const LoginPage = () => {
  const [hasError, setHasError] = useState(false);
  const { register, handleSubmit } = useForm<FormData>();
  const history = useHistory()

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then(response => {
        saveAuthData(response.data);    
        setHasError(false);    
        console.log("Sucesso! ", response);  
        history.push('/movies');
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
