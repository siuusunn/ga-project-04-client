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
      <h3>Leaderboard</h3>
      {sortedScore?.map((user) => (
        <>
          <li>
            <div className='user-score-items-div'>
              {user.owner.username} | Red Packets: {user.number_of_red_packets}
              <div className='user-items-div'>
                <p>Items: </p>
                {user.items.map((item) => (
                  <img
                    src={item.item_image}
                    alt={item.item_image}
                    className='leaderboard-item-image'
                  ></img>
                ))}
              </div>
            </div>
          </li>
        </>
      ))}
    </>
  );
}
