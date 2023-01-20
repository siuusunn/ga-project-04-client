import { useState, useEffect } from 'react';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';

export default function User({ redpackets }) {
  const [userData, setUserData] = useState(null);

  const id = AUTH.getPayload().sub;

  // console.log(id);

  useEffect(() => {
    API.GET(API.ENDPOINTS.singlePocket(id))
      .then(({ data }) => {
        setUserData(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, [id, redpackets]);

  // console.log(userData);

  return (
    <>
      <h2>{userData?.owner.username}'s Progress</h2>
      <ul>
        Items owned:{' '}
        {userData?.items.map((item) => (
          <li>{item.name}</li>
        ))}
      </ul>
    </>
  );
}
