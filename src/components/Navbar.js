import { Link, useNavigate } from 'react-router-dom';
import { AUTH } from '../lib/auth';
import { useAuthenticated } from '../hooks/useAuthenticated';
import '../styles/Navbar.scss';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useAuthenticated();
  const navigate = useNavigate();

  const logout = () => {
    AUTH.deleteToken();
    setIsLoggedIn(false);
    // navigate('/clicker');
    window.location.reload();
  };

  return (
    <>
      <nav>
        <Link to='/clicker' className='navbar-item'>
          CLICKER
        </Link>
        {isLoggedIn ? (
          <Link to='/clicker' onClick={logout} className='navbar-item'>
            LOGOUT
          </Link>
        ) : (
          <>
            <Link to='/loginregister' className='navbar-item'>
              LOGIN & REGISTER
            </Link>
          </>
        )}
      </nav>
    </>
  );
}
