import Navbar from 'components/Navbar';
import LoginPage from 'pages/LoginPage';
import MovieDetails from 'pages/MovieDetails';
import MovieList from 'pages/MovieList';
import { Switch, Route, BrowserRouter } from 'react-router-dom';


const Routes = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" >
        <LoginPage />
      </Route>      
      <Route exact path="/movies" >
        <MovieList />
      </Route> 
      <Route path="/movies/movieId" >
        <MovieDetails />
      </Route>   
    </Switch>
  </BrowserRouter>
);

export default Routes;
