import { useState } from 'react';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';

export default function Register() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: ''
    // profile_image: ''
  });
  const [file, setFile] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    setFile(event.target.files[0]);
    // console.log(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const imageData = new FormData();
    imageData.append('file', file);
    imageData.append(
      'upload_preset',
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const cloudinaryResponse = await API.POST(
        API.ENDPOINTS.cloudinary,
        imageData
      );
      const imageId = cloudinaryResponse.data.public_id;

      const apiReqBody = {
        ...formFields,
        profile_image: imageId
      };

      await API.POST(API.ENDPOINTS.register, apiReqBody);

      const loginData = await API.POST(API.ENDPOINTS.login, {
        email: formFields.email,
        password: formFields.password
      });

      AUTH.setToken(loginData.data.token);

      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   try {
  //     API.POST(API.ENDPOINTS.register, formFields).then(({ data }) => {
  //       console.log(data);
  //       API.POST(API.ENDPOINTS.login, {
  //         email: formFields.email,
  //         password: formFields.password
  //       })
  //         .then(({ data }) => {
  //           API.POST(API.ENDPOINTS.allPockets, data);
  //           AUTH.setToken(data.token);
  //           navigate('/');
  //         })
  //         .catch((e) => console.error(e));
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <div className='register-container'>
        <h1 className='register-title'>REGISTER</h1>
        <form onSubmit={handleSubmit}>
          <div className='register-input-container'>
            <label htmlFor='username' className='register-label'>
              USERNAME:
            </label>
            <input
              type='text'
              id='username'
              name='username'
              onChange={handleChange}
              className='register-input'
              required
            ></input>
            <label htmlFor='email' className='register-label'>
              EMAIL:
            </label>
            <input
              type='email'
              id='register-email'
              name='email'
              onChange={handleChange}
              className='register-input'
              required
            ></input>
            <label htmlFor='password' className='register-label'>
              PASSWORD:
            </label>
            <div className='register-password-div'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='register-password'
                name='password'
                onChange={handleChange}
                className='register-password-input'
                required
              ></input>
              {showPassword ? (
                <VisibilityOutlined
                  className='visibility-button'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                />
              ) : (
                <VisibilityOffOutlined
                  className='visibility-button'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                />
              )}
            </div>
            <label htmlFor='password_confirmation' className='register-label'>
              PASSWORD CONFIRMATION:
            </label>
            <div className='register-password-div'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password_confirmation'
                name='password_confirmation'
                onChange={handleChange}
                className='register-password-input'
                required
              ></input>
              {showPassword ? (
                <VisibilityOutlined
                  className='visibility-button'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                />
              ) : (
                <VisibilityOffOutlined
                  className='visibility-button'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                />
              )}
            </div>
            <label htmlFor='first_name' className='register-label'>
              FIRST NAME:
            </label>
            <input
              type='first_name'
              id='first_name'
              name='first_name'
              onChange={handleChange}
              className='register-input'
              required
            ></input>
            <label htmlFor='last_name' className='register-label'>
              LAST NAME:
            </label>
            <input
              type='last_name'
              id='last_name'
              name='last_name'
              onChange={handleChange}
              className='register-input'
              required
            ></input>
            <label htmlFor='profile_image' className='register-label'>
              PROFILE PICTURE:
            </label>
            <input
              type='file'
              id='profile_image'
              name='profile_image'
              onChange={handleFileChange}
              required
            ></input>
            <button type='submit' className='register-button'>
              SIGN UP
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
