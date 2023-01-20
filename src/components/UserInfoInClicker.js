import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';

export default function User() {
  // const { pk } = useParams();
  const [userData, setUserData] = useState(null);

  const pk = AUTH.getPayload().sub;

  console.log(pk);

  useEffect(() => {
    API.GET(API.ENDPOINTS.singlePocket(pk))
      .then(({ data }) => {
        setUserData(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, [pk]);

  console.log(userData);

  return (
    <>
      <h2>{userData?.owner.username}'s Progress</h2>
      <p>No. of red packets: {userData?.number_of_red_packets}</p>
      <ul>
        Items owned:{' '}
        {userData?.items.map((item) => (
          <li>{item.name}</li>
        ))}
      </ul>
    </>
  );
}
