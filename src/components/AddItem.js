// import '../styles/AddItem.scss';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { API } from '../lib/api';
// import { AUTH } from '../lib/auth';

// export default function AddItem() {
//   const navigate = useNavigate();
//   const [formFields, setFormFields] = useState({
//     name: '',
//     description: '',
//     item_image: '',
//     red_packets_needed_to_unlock: 0,
//     multiplier: 0
//   });

//   const handleChange = (event) => {
//     setFormFields({ ...formFields, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       API.POST(API.ENDPOINTS.allItems, formFields, API.getHeaders()).then(
//         ({ data }) => {
//           console.log(data);
//           navigate('/clicker');
//           console.log('Item added!');
//         }
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <div className='add-item-container'>
//         <h1 className='add-item-title'>LOGIN</h1>
//         <form onSubmit={handleSubmit}>
//           <div className='add-item-input-container'>
//             <label htmlFor='name' className='add-item-label'>
//               NAME:
//             </label>
//             <input
//               type='text'
//               id='name'
//               name='name'
//               onChange={handleChange}
//               className='add-item-input'
//               required
//             ></input>
//           </div>
//           <div className='add-item-input-container'>
//             <label htmlFor='description' className='add-item-label'>
//               DESCRIPTION:
//             </label>
//             <input
//               type='text'
//               id='description'
//               name='description'
//               onChange={handleChange}
//               className='add-item-input'
//               required
//             ></input>
//           </div>
//           <div className='add-item-input-container'>
//             <label htmlFor='item-image' className='add-item-label'>
//               ITEM IMAGE:
//             </label>
//             <input
//               type='text'
//               id='item_image'
//               name='item_image'
//               onChange={handleChange}
//               className='add-item-input'
//               required
//             ></input>
//           </div>
//           <div className='add-item-input-container'>
//             <label htmlFor='red-packet-number' className='add-item-label'>
//               RED PACKETS NEEDED TO UNLOCK:
//             </label>
//             <input
//               type='number'
//               id='red_packets_needed_to_unlock'
//               name='red_packets_needed_to_unlock'
//               onChange={handleChange}
//               className='add-item-input'
//               required
//             ></input>
//           </div>
//           <div className='add-item-input-container'>
//             <label htmlFor='red-packet-multiplier' className='add-item-label'>
//               MULTIPLIER:
//             </label>
//             <input
//               type='number'
//               id='multiplier'
//               name='multiplier'
//               onChange={handleChange}
//               className='add-item-input'
//               required
//             ></input>
//           </div>
//           <button type='submit' className='item-submit-button'>
//             SUBMIT
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }
