import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  TelegramIcon,
  TelegramShareButton,
  LineIcon,
  LineShareButton,
  VKIcon,
  VKShareButton,
  WeiboIcon,
  WeiboShareButton,
  EmailIcon,
  EmailShareButton
} from 'react-share';

import '../styles/SocialsModal.scss';
import { useState } from 'react';

const shareUrl = 'http://google.com';
const shareTitle = 'Get on Red Packet Clicker to earn red packets together';

export default function SocialsModal() {
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <>
      <button onClick={handleClick} className='button instruction-button'>
        SHARE
      </button>
      {showModal ? (
        <div className='socials-modal'>
          <div className='socials-modal-content'>
            <span class='close' onClick={handleClose}>
              &times;
            </span>
            <h1 className='socials-modal-title'>SHARE ON SOCIALS</h1>
            <div className='socials-icons-container'>
              <FacebookShareButton
                appId=''
                url={shareUrl}
                title={shareTitle}
                quote={shareTitle}
              >
                <FacebookIcon />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={shareTitle}>
                <TwitterIcon />
              </TwitterShareButton>
              <LinkedinShareButton url={shareUrl} title={shareTitle}>
                <LinkedinIcon />
              </LinkedinShareButton>
              <TelegramShareButton url={shareUrl} title={shareTitle}>
                <TelegramIcon />
              </TelegramShareButton>
              <LineShareButton url={shareUrl} title={shareTitle}>
                <LineIcon />
              </LineShareButton>
              <VKShareButton url={shareUrl} title={shareTitle}>
                <VKIcon />
              </VKShareButton>
              <WeiboShareButton url={shareUrl} title={shareTitle}>
                <WeiboIcon />
              </WeiboShareButton>
              <EmailShareButton
                url={shareUrl}
                title={shareTitle}
                subject={shareTitle}
              >
                <EmailIcon />
              </EmailShareButton>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
