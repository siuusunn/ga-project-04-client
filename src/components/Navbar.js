import { Link, useNavigate } from 'react-router-dom';
import { AUTH } from '../lib/auth';
import { useAuthenticated } from '../hooks/useAuthenticated';

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
        <Link to='/'>Home</Link>
        <Link to='/clicker'>Clicker</Link>
        <Link to='/users'>Leaderboard</Link>
        {isLoggedIn ? (
          <Link to='/' onClick={logout}>
            Log out
          </Link>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </nav>
    </>
  );
}
