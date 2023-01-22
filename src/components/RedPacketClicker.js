import redPacket from '../assets/8-bit-redpacket.png';
import '../styles/RedPacketClicker.scss';
import { useState, useEffect } from 'react';
import ItemsDisplayInClicker from './ItemsDisplayInClicker';
import Comments from './Comments';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';

export default function RedPacketClicker() {
  const [userData, setUserData] = useState(null);
  const [clicks, setClicks] = useState(0);

  const id = AUTH.getPayload().sub;

  useEffect(() => {
    API.GET(API.ENDPOINTS.singlePocket(id)).then(({ data }) => {
      setUserData(data);
    });
  }, [id, userData?.number_of_red_packets]);

  const handleClick = (e) => {
    setClicks((click) => (click += 1));
    localStorage.setItem('number_of_red_packets', clicks);
    console.log(clicks);
  };

  console.log(userData);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const existing_red_packets = userData?.number_of_red_packets;
      const new_number_of_red_packets = existing_red_packets + clicks;
      const apiReqBody = {
        number_of_red_packets: new_number_of_red_packets
      };
      API.PUT(
        API.ENDPOINTS.singlePocket(userData?.id),
        apiReqBody,
        API.getHeaders()
      )
        .then(localStorage.setItem('number_of_red_packets', 0))
        .then(window.location.reload());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className='clicker-page-container'>
        <div className='items-display-div'>
          <ItemsDisplayInClicker
            numberOfRedPackets={userData?.number_of_red_packets}
            userItems={userData?.items}
            userId={userData?.id}
          />
        </div>
        <div className='red-packet-div'>
          <img
            src={redPacket}
            alt='red-packet-clicker-button'
            onClick={handleClick}
            className='red-packet-clicker-button'
          ></img>
        </div>
        <div className='user-info-div'>
          <h1>{userData?.owner.username}'s Pocket</h1>
          <h3>
            Red Packets earned this session:{' '}
            {localStorage.getItem('number_of_red_packets', clicks)}
          </h3>
          <h4>
            Total Red Packets earned in previous sessions:{' '}
            {userData?.number_of_red_packets}
          </h4>
          <h4>Items owned:</h4>
          {userData?.items.map((item) => (
            <li>{item.name}</li>
          ))}
          <br />
          <button onClick={handleSubmit}>Save Your Session</button>
        </div>
        <div className='comments-div'>
          <Comments />
        </div>
      </div>
    </>
  );
}
