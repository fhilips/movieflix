import { ReactComponent as MainImage } from 'assets/images/main-image.svg';
import MainButton from 'components/MainButton';
import { useForm } from 'react-hook-form';
import './styles.scss';

type FormData = {
  username: string,
  password: string,
}

const LoginPage = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    console.log(formData)
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
