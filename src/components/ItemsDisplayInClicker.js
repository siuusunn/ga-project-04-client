import { useState, useEffect } from 'react';
import { API } from '../lib/api';
import '../styles/ItemsDisplayInClicker.scss';

export default function ItemsDisplayInClicker({ number_of_red_packets }) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allItems)
      .then(({ data }) => {
        setItems(data);
        console.log(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  return (
    <>
      <h1>Items</h1>
      <div>
        {items?.map((item) => (
          <>
            <div key={item.name} className='single-item-div'>
              <div className='image-and-name-div'>
                <img
                  src={item.item_image}
                  className='item-image'
                  alt={item.item_image}
                ></img>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>
                    Red Packets Needed to unlock:{' '}
                    {item.red_packets_needed_to_unlock}
                  </p>
                  <p>Effects: + {item.multiplier} red packet per click</p>
                  {number_of_red_packets >=
                  item.red_packets_needed_to_unlock ? (
                    <button>Unlock</button>
                  ) : (
                    <button disabled>Unlock</button>
                  )}
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
