import Navbar from 'components/Navbar';
import PrivateRoute from 'components/PrivateRoute';
import LoginPage from 'pages/LoginPage';
import MovieDetails from 'pages/MovieDetails';
import MovieList from 'pages/MovieList';
import { Switch, Route, Router } from 'react-router-dom';
import history from 'utils/history';


const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route exact path="/" >
        <LoginPage />
      </Route>      
      <PrivateRoute path="/movies" >
        <MovieList />
      </PrivateRoute> 
      <PrivateRoute path="/movies/:movieId" >
        <MovieDetails />
      </PrivateRoute>   
    </Switch>
  </Router>
);

export default Routes;
