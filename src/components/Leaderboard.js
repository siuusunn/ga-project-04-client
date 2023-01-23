import { useState, useEffect } from 'react';
import { API } from '../lib/api';
import '../styles/Leaderboard.scss';

export default function Users() {
  const [users, setUsers] = useState(null);
  const sortedScore = users?.sort(
    (a, b) => b.number_of_red_packets - a.number_of_red_packets
  );

  useEffect(() => {
    API.GET(API.ENDPOINTS.allPockets)
      .then(({ data }) => {
        setUsers(data);
        // console.log(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  return (
    <>
      <h3 className='leaderboard-title'>LEADERBOARD</h3>
      <div className='leaderboard-container'>
        {sortedScore?.map((user) => (
          <>
            <li>
              <span className='username'>{user.owner.username}</span>
              <p className='user-score'>
                Red Packets: {user.number_of_red_packets}
              </p>
              <div className='user-items-div'>
                <p className='user-items'>Items: </p>
                {user.items.map((item) => (
                  <img
                    src={item.item_image}
                    alt={item.item_image}
                    className='leaderboard-item-image'
                  ></img>
                ))}{' '}
              </div>
            </li>
          </>
        ))}
      </div>
    </>
  );
}
