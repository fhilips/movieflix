import Navbar from 'components/Navbar';
import LoginPage from 'pages/LoginPage';
import { Switch, Route, BrowserRouter } from 'react-router-dom';


const Routes = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" >
        <LoginPage />
      </Route>      
    </Switch>
  </BrowserRouter>
);

export default Routes;
