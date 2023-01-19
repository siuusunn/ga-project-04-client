import { useState } from 'react';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    email: '',
    password: ''
  });
  // const [file, setFile] = useState();

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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label for='email'>Email:</label>
        <br />
        <input
          type='email'
          id='email'
          name='email'
          onChange={handleChange}
        ></input>
        <br />
        <label for='password'>Password:</label>
        <br />
        <input
          type='password'
          id='password'
          name='password'
          onChange={handleChange}
        ></input>
        <br />
        <br />
        <button type='submit'>Sign In</button>
      </form>
    </>
  );
}
