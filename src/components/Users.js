import { useState, useEffect } from 'react';
import { API } from '../lib/api';

export default function Users() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allUsers)
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
      <h1>See who you are competing with!</h1>
      {users?.map((user) => (
        <>
          <div>
            <img src={user.profile_image}></img>
            <h3>{user.username}</h3>
            <p>Red packets: {user.number_of_red_packets}</p>
            <p>Items owned: {user.items}</p>
            <p>Current multiplier: {user.multiplier}</p>
          </div>
        </>
      ))}
    </>
  );
}
