import { useState, useEffect } from 'react';
import { API } from '../lib/api';
import '../styles/ItemsDisplayInClicker.scss';

export default function ItemsDisplayInClicker({
  numberOfRedPackets,
  userItems
}) {
  const [items, setItems] = useState(null);
  const [unlockedItems, setUnlockedItems] = useState([]);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allItems)
      .then(({ data }) => {
        setItems(data);
        setUnlockedItems(userItems?.map((item) => item.id));
        console.log(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, [userItems]);

  console.log(unlockedItems);

  const handleUnlock = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

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
                  {numberOfRedPackets >= item.red_packets_needed_to_unlock &&
                  unlockedItems?.includes(item.id) === false ? (
                    <button value={item.id} onClick={handleUnlock}>
                      Unlock
                    </button>
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
