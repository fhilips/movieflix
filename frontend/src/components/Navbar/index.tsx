import { AuthContext } from 'AuthContext';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import history from 'utils/history';
import { getTokenData, isAuthenticated, removeAuthData } from 'utils/request';
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
        <h1 className="navbar-title">MovieFlix</h1>
        <div className="nav-login-logout">
          {authContextData.authenticated ? (
            <>
              <a href="#logout" onClick={handleLogoutClick} >LOGOUT</a>
            </>
          )  : (
            <Link to="/">LOGIN</Link>
          )
          }
        </div>
    </div>
  )
}

export default Navbar;