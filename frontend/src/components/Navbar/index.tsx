import { AuthContext } from 'AuthContext';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTokenData, isAuthenticated } from 'utils/auth';
import history from 'utils/history';

import { removeAuthData } from 'utils/storage';
import './styles.scss'

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);
  
  useEffect(() => {
   if (isAuthenticated()) {
     setAuthContextData({
      authenticated: true,
      tokenData: getTokenData()
     })   
   } else {
     setAuthContextData({
       authenticated: false
     })
   }
  }, [setAuthContextData])

  const handleLogoutClick = (event : React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false
    });
    history.replace('/');
  }

  return( 
    <div className="navbar-container bg-primary">
      <Link to="/movies"><h1 className="navbar-title">MovieFlix</h1></Link>
        
        <div className="nav-login-logout">
          {authContextData.authenticated ? (
            <>
              <a className="btn-login-logout" href="/" onClick={handleLogoutClick} >LOGOUT</a>
            </>
          )  : (
            <Link className="btn-login-logout" to="/">LOGIN</Link>
          )
          }
        </div>
    </div>
  )
}

export default Navbar;