import { useState } from 'react';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
    profile_image: ''
  });
  // const [file, setFile] = useState();

  const handleChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  // const handleFileChange = (event) => {
  //   event.preventDefault();
  //   setFile(event.target.file[0]);
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const imageData = new FormData();
  //   imageData.append('file', file);
  //   imageData.append(
  //     'upload_preset',
  //     process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
  //   );

  //   try {
  //     const cloudinaryResponse = await API.POST(
  //       API.ENDPOINTS.cloudinary,
  //       imageData
  //     );
  //     const imageId = cloudinaryResponse.data.public_id;

  //     const apiReqBody = {
  //       ...formFields,
  //       profile_image: imageId
  //     };

  //     await API.POST(API.ENDPOINTS.register, apiReqBody);

  //     const loginData = await API.POST(API.ENDPOINTS.login, {
  //       email: formFields.email,
  //       password: formFields.password
  //     });

  //     AUTH.setToken(loginData.data.token);

  //     navigate('/');
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      API.POST(API.ENDPOINTS.register, formFields).then(({ data }) => {
        console.log(data);
        API.POST(API.ENDPOINTS.login, {
          email: formFields.email,
          password: formFields.password
        })
          .then(({ data }) => {
            AUTH.setToken(data.token);
            navigate('/');
          })
          .catch((e) => console.error(e));
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label for='username'>Username:</label>
        <br />
        <input
          type='text'
          id='username'
          name='username'
          onChange={handleChange}
        ></input>
        <br />
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
        <label for='password_confirmation'>Password Confirmation:</label>
        <br />
        <input
          type='password'
          id='password_confirmation'
          name='password_confirmation'
          onChange={handleChange}
        ></input>
        <br />
        <label for='first_name'>First Name:</label>
        <br />
        <input
          type='first_name'
          id='first_name'
          name='first_name'
          onChange={handleChange}
        ></input>
        <br />
        <label for='last_name'>Last Name:</label>
        <br />
        <input
          type='last_name'
          id='last_name'
          name='last_name'
          onChange={handleChange}
        ></input>
        <br />
        <label for='profile_image'>Profile Image:</label>
        <br />
        {/* <input
          type='file'
          id='profile_image'
          name='profile_image'
          onChange={handleFileChange}
        ></input>
        <br /> */}
        <input
          type='type'
          id='profile_image'
          name='profile_image'
          onChange={handleChange}
        ></input>
        <br />
        <br />
        <button type='submit'>Sign Up</button>
      </form>
    </>
  );
}
