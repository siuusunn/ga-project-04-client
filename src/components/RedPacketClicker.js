import redPacket from '../assets/red-packet.png';
import '../styles/RedPacketClicker.scss';
import { useState, useEffect } from 'react';
import UserInfoInClicker from './UserInfoInClicker';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';

export default function RedPacketClicker() {
  const [clicks, setClicks] = useState(0);
  const [userData, setUserData] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    profile_image: '',
    number_of_red_packets: 0,
    items: [],
    multipliers: 1
  });

  const pk = AUTH.getPayload().sub;

  let click = 0;

  useEffect(() => {
    API.GET(API.ENDPOINTS.singleUser(pk)).then(({ data }) => setUserData(data));
  }, [pk]);

  console.log(userData);

  // const apiReqBody = {
  //   ...userData,
  //   number_of_red_packets: click
  // };

  const handleClick = (e) => {
    e.preventDefault();
    click += 1;
    console.log(click);
    localStorage.setItem('number_of_red_packets', click);

    const apiReqBody = {
      ...userData,
      number_of_red_packets: localStorage.getItem('number_of_red_packets')
    };

    API.PUT(API.ENDPOINTS.singleUser(pk), apiReqBody, API.getHeaders());
  };

  // setInterval(() => {
  //   console.log(localStorage.getItem('number_of_red_packets'));
  //   API.PUT(
  //     API.ENDPOINTS.singleUser(pk),
  //     localStorage.getItem('number_of_red_packets'),
  //     API.getHeaders()
  //   );
  // }, 10000);

  return (
    <>
      <img
        src={redPacket}
        alt='red-packet-clicker-button'
        onClick={handleClick}
        className='red-packet-clicker-button'
      ></img>
      {/* <UserInfoInClicker /> */}
    </>
  );
}
