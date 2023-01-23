import { useState } from 'react';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      API.POST(API.ENDPOINTS.login, formFields).then(({ data }) => {
        console.log(data);
        AUTH.setToken(data.token);
        navigate('/');
        console.log('Successfully logged in');
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='login-container'>
        <h1 className='login-title'>LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <div className='login-input-container'>
            <label for='email' className='login-label'>
              EMAIL:
            </label>
            <input
              type='email'
              id='email'
              name='email'
              onChange={handleChange}
              className='login-input'
            ></input>
            <label for='password' className='login-label'>
              PASSWORD:
            </label>
            <input
              type='password'
              id='password'
              name='password'
              onChange={handleChange}
              className='login-input'
            ></input>
            <button type='submit' className='login-button'>
              SIGN IN
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
