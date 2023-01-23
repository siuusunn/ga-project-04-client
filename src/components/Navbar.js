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
    navigate('/');
  };

  return (
    <>
      <nav>
        <Link to='/' className='navbar-item'>
          HOME
        </Link>
        <Link to='/clicker' className='navbar-item'>
          CLICKER
        </Link>
        {isLoggedIn ? (
          <Link to='/' onClick={logout} className='navbar-item'>
            LOGOUT
          </Link>
        ) : (
          <>
            <Link to='/loginregister' className='navbar-item'>
              LOGIN & REGISTER
            </Link>
            {/* <Link to='/register' className='navbar-item'>
              REGISTER
            </Link> */}
          </>
        )}
      </nav>
    </>
  );
}
