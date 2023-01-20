import redPacket from '../assets/8-bit-redpacket.png';
import '../styles/RedPacketClicker.scss';
import { useState, useEffect } from 'react';
import UserInfoInClicker from './UserInfoInClicker';
import Comments from './Comments';
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
    API.GET(API.ENDPOINTS.singlePocket(pk)).then(({ data }) =>
      setUserData(data)
    );
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

    API.PUT(API.ENDPOINTS.singlePocket(pk), apiReqBody, API.getHeaders());
  };

  return (
    <>
      <div className='clicker-page-container'>
        <div className='red-packet-div'>
          <img
            src={redPacket}
            alt='red-packet-clicker-button'
            onClick={handleClick}
            className='red-packet-clicker-button'
          ></img>
        </div>
        <div className='user-info-div'>
          <UserInfoInClicker />
        </div>
        <div className='comments-div'>
          <Comments />
        </div>
      </div>
    </>
  );
}
