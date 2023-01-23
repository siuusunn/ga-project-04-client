import { useState, useEffect } from 'react';
import { API } from '../lib/api';
import '../styles/ItemsDisplayInClicker.scss';

export default function ItemsDisplayInClicker({
  numberOfRedPackets,
  userItems,
  userId,
  userMultiplier
}) {
  const [items, setItems] = useState(null);
  const [unlockedItems, setUnlockedItems] = useState([]);
  let numberOfRedPacketsAfterUnlock = numberOfRedPackets;

  const apiReqBody = {
    number_of_red_packets: numberOfRedPacketsAfterUnlock,
    items: unlockedItems,
    multiplier: userMultiplier
  };

  // console.log(userMultiplier);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allItems)
      .then(({ data }) => {
        setItems(data);
        setUnlockedItems(userItems?.map((item) => item.id));
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, [userItems, numberOfRedPackets]);

  const isUnlocked = (
    itemId,
    red_packets_needed_to_unlock,
    rpToUnlock,
    itemMultiplier
  ) => {
    if (unlockedItems?.includes(itemId)) {
      return <button disabled>Item Unlocked</button>;
    } else if (
      numberOfRedPackets >= red_packets_needed_to_unlock &&
      unlockedItems?.includes(itemId) === false
    ) {
      return (
        <button
          value={itemId}
          id={rpToUnlock}
          onClick={handleUnlock}
          className={itemMultiplier}
        >
          Unlock
        </button>
      );
    } else if (
      numberOfRedPackets < red_packets_needed_to_unlock &&
      unlockedItems?.includes(itemId) === false
    ) {
      return <button disabled>Not enough red packets to unlock</button>;
    }
  };

  // ! PROBLEM: RENDERS TWICE SO THE MATH IS NOT ACCURATE

  const handleUnlock = (e) => {
    e.preventDefault();
    numberOfRedPacketsAfterUnlock = numberOfRedPackets - e.target.id;
    console.log(numberOfRedPacketsAfterUnlock, userId);
    apiReqBody.number_of_red_packets =
      numberOfRedPacketsAfterUnlock - e.target.id;
    apiReqBody.items.push(e.target.value);
    apiReqBody.multiplier = userMultiplier + parseInt(e.target.className);
    console.log(apiReqBody);
    API.PUT(API.ENDPOINTS.singlePocket(userId), apiReqBody, API.getHeaders());
    window.location.reload();
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
                  <p className='item-description'>{item.description}</p>
                  <p className='item-unlock-amount'>
                    Red Packets Needed to unlock:{' '}
                    {item.red_packets_needed_to_unlock}
                  </p>
                  <p className='item-effect'>
                    Effects: + {item.multiplier} red packet per click
                  </p>
                  {/* {numberOfRedPackets >= item.red_packets_needed_to_unlock &&
                  unlockedItems?.includes(item.id) === false ? (
                    <button value={item.id} onClick={handleUnlock}>
                      Unlock
                    </button>
                  ) : (
                    <button disabled>Unlock</button>
                  )} */}
                  {isUnlocked(
                    item.id,
                    item.red_packets_needed_to_unlock,
                    item.red_packets_needed_to_unlock,
                    item.multiplier
                  )}
                </div>
              </div>
            </div>
            <hr />
          </>
        ))}
      </div>
    </>
  );
}
