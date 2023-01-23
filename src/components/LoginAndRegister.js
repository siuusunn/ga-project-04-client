import Login from './Login';
import Register from './Register';
import '../styles/LoginAndRegister.scss';

export default function LoginAndRegister() {
  return (
    <>
      <div className='login-and-register-container'>
        <Login />
        <Register />
      </div>
    </>
  );
}
