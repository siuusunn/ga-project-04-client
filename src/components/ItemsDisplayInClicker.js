import React, { useState, useEffect } from 'react';
import { API } from '../lib/api';
import ItemImage from './common/ItemImage';
import '../styles/ItemsDisplayInClicker.scss';

export default function ItemsDisplayInClicker({
  numberOfRedPackets,
  userItems,
  userId,
  userMultiplier,
  isUpdatedFunction
}) {
  const [items, setItems] = useState(null);
  const [unlockedItems, setUnlockedItems] = useState([]);
  let numberOfRedPacketsAfterUnlock = numberOfRedPackets;

  const apiReqBody = {
    number_of_red_packets: numberOfRedPacketsAfterUnlock,
    items: unlockedItems,
    multiplier: userMultiplier
  };

  useEffect(() => {
    API.GET(API.ENDPOINTS.allItems)
      .then(({ data }) => {
        setItems(data);
        setUnlockedItems(userItems?.map((item) => item.id));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userItems]);

  const isUnlocked = (
    itemId,
    red_packets_needed_to_unlock,
    rpToUnlock,
    itemMultiplier
  ) => {
    if (unlockedItems?.includes(itemId)) {
      return <button disabled>ITEM UNLOCKED</button>;
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
          UNLOCK
        </button>
      );
    } else if (
      numberOfRedPackets < red_packets_needed_to_unlock &&
      unlockedItems?.includes(itemId) === false
    ) {
      return <button disabled>NOT ENOUGH RED PACKETS</button>;
    }
  };

  const handleUnlock = (e) => {
    e.preventDefault();
    try {
      numberOfRedPacketsAfterUnlock = numberOfRedPackets - e.target.id;
      apiReqBody.number_of_red_packets = numberOfRedPacketsAfterUnlock;
      apiReqBody.items.push(e.target.value);
      apiReqBody.multiplier = userMultiplier + parseInt(e.target.className);
      API.PUT(API.ENDPOINTS.singlePocket(userId), apiReqBody, API.getHeaders());
      isUpdatedFunction();
      console.log('unlocked');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className='items-title'>ITEMS</h1>
      <div>
        {items?.map((item) => (
          <React.Fragment key={item.id}>
            <div className='single-item-div'>
              <div className='image-and-name-div'>
                <ItemImage
                  cloudinaryImageId={item.item_image}
                  imageHeight={80}
                  imageWidth={80}
                  className='item-image'
                />
                <div className='item-info-div'>
                  <h3>{item.name}</h3>
                  <p className='item-description'>{item.description}</p>
                  <p className='item-unlock-amount'>
                    Cost : {item.red_packets_needed_to_unlock} Red Packets
                  </p>
                  <p className='item-effect'>
                    Effects: + {item.multiplier} Red Packets per click
                  </p>
                  {isUnlocked(
                    item.id,
                    item.red_packets_needed_to_unlock,
                    item.red_packets_needed_to_unlock,
                    item.multiplier
                  )}
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
