import { useState, useEffect } from 'react';
import { API } from '../lib/api';

export default function Users() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allPockets)
      .then(({ data }) => {
        setUsers(data);
        console.log(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  return (
    <>
      <h1>Leaderboard</h1>
      {users?.map((user) => (
        <>
          <div>
            <h3>{user.owner.username}</h3>
            <p>Red Packets: {user.number_of_red_packets}</p>
            <p>
              Items:{' '}
              {user.items.map((item) => (
                <p>{item.name}</p>
              ))}
            </p>
          </div>
        </>
      ))}
    </>
  );
}
