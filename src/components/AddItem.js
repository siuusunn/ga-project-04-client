import '../styles/AddItem.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../lib/api';

export default function AddItem() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    name: '',
    description: '',
    item_image: '',
    red_packets_needed_to_unlock: 0,
    multiplier: 0
  });
  const [file, setFile] = useState('');

  const handleChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    setFile(event.target.files[0]);
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
        item_image: imageId
      };

      await API.POST(API.ENDPOINTS.allItems, apiReqBody, API.getHeaders()).then(
        ({ data }) => {
          navigate('/');
          console.log('Item added!');
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='add-item-page-container'>
        <div className='add-item-container'>
          <h1 className='add-item-title'>ADD NEW ITEM</h1>
          <form onSubmit={handleSubmit}>
            <div className='add-item-input-container'>
              <label htmlFor='name' className='add-item-label'>
                NAME:
              </label>
              <input
                type='text'
                id='name'
                name='name'
                onChange={handleChange}
                className='add-item-input'
                required
              ></input>
            </div>
            <div className='add-item-input-container'>
              <label htmlFor='description' className='add-item-label'>
                DESCRIPTION:
              </label>
              <input
                type='text'
                id='description'
                name='description'
                onChange={handleChange}
                className='add-item-input'
                required
              ></input>
            </div>
            <div className='add-item-input-container'>
              <label htmlFor='item-image' className='add-item-label'>
                ITEM IMAGE:
              </label>
              <input
                type='file'
                id='item_image'
                name='item_image'
                onChange={handleFileChange}
                className='add-item-input'
                required
              ></input>
            </div>
            <div className='add-item-input-container'>
              <label htmlFor='red-packet-number' className='add-item-label'>
                RED PACKETS NEEDED TO UNLOCK:
              </label>
              <input
                type='number'
                id='red_packets_needed_to_unlock'
                name='red_packets_needed_to_unlock'
                onChange={handleChange}
                className='add-item-input'
                required
              ></input>
            </div>
            <div className='add-item-input-container'>
              <label htmlFor='red-packet-multiplier' className='add-item-label'>
                MULTIPLIER:
              </label>
              <input
                type='number'
                id='multiplier'
                name='multiplier'
                onChange={handleChange}
                className='add-item-input'
                required
              ></input>
              <button type='submit' className='item-submit-button'>
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
