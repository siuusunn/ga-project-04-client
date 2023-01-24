import React, { useState, useEffect } from 'react';
import { API } from '../lib/api';
import '../styles/Leaderboard.scss';
import ProfilePicture from './common/ProfilePicture';
import ItemImage from './common/ItemImage';

export default function Users({ updateStatus }) {
  const [users, setUsers] = useState(null);
  const sortedScore = users?.sort(
    (a, b) => b.number_of_red_packets - a.number_of_red_packets
  );

  useEffect(() => {
    API.GET(API.ENDPOINTS.allPockets)
      .then(({ data }) => {
        setUsers(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, [updateStatus]);

  return (
    <>
      <h3 className='leaderboard-title'>LEADERBOARD</h3>
      <div className='leaderboard-container'>
        {sortedScore?.map((user) => (
          <React.Fragment key={user.id}>
            <li>
              <div className='username-and-profile-div'>
                <h4 className='username'>{user.owner.username}</h4>
                <ProfilePicture
                  cloudinaryImageId={user.owner.profile_image}
                  imageWidth={40}
                  imageHeight={40}
                  className='leaderboard-profile-picture'
                />
              </div>

              <p className='user-score'>
                Red Packets: {user.number_of_red_packets}
              </p>
              <div className='user-items-div'>
                <p className='user-items'>Items: </p>
                {user.items.map((item) => (
                  <ItemImage
                    key={item.id}
                    cloudinaryImageId={item.item_image}
                    imageHeight={35}
                    imageWidth={35}
                  />
                ))}
              </div>
            </li>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
