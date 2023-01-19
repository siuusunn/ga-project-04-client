import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/clicker'>Clicker</Link>
        <Link to='/items'>Items</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </nav>
    </>
  );
}
