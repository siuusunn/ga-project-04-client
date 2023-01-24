import { Link, useNavigate } from 'react-router-dom';
import { AUTH } from '../lib/auth';
import { useAuthenticated } from '../hooks/useAuthenticated';
import '../styles/Navbar.scss';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useAuthenticated();

  const logout = () => {
    AUTH.deleteToken();
    setIsLoggedIn(false);
    AUTH.isSuperUser('false');
    window.location.reload();
  };

  return (
    <>
      <nav>
        <Link to='/clicker' className='navbar-item'>
          CLICKER
        </Link>
        {/* {AUTH.getSuperUser() === 'true' ? (
          <Link to='/additem' className='navbar-item'>
            ADD ITEM
          </Link>
        ) : (
          <></>
        )} */}
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
