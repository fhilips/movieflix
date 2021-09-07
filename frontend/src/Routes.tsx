import Navbar from 'components/Navbar';
import LoginPage from 'pages/LoginPage';
import MovieDetails from 'pages/MovieDetails';
import MovieList from 'pages/MovieList';
import { Switch, Route, Router } from 'react-router-dom';
import history from 'utils/history';


const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route  path="/" exact>
        <LoginPage />
      </Route>      
      <Route path="/movies" exact>
        <MovieList />
      </Route> 
      <Route path="/movies/:movieId" >
        <MovieDetails />
      </Route>   
    </Switch>
  </Router>
);

export default Routes;
