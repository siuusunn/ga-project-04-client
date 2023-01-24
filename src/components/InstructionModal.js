import '../styles/InstructionModal.scss';
import { useState } from 'react';

export default function InstructionModal() {
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
      <button onClick={handleClick} className='instruction-button'>
        HOW TO PLAY
      </button>
      {showModal ? (
        <div className='modal'>
          <div className='modal-content'>
            <span class='close' onClick={handleClose}>
              &times;
            </span>
            <h1 className='modal-title'>HOW TO PLAY</h1>
            <li>
              Click the red packet in the middle of the screen to earn red
              packets
            </li>
            <li>Unlock new items to boost your red packets per click</li>
            <li>Check out the leaderboard to see who's in the lead</li>
            <li>Trash talk your competitors in the chat</li>
            <div className='reminder-disclaimer'>
              <h3>Don't forget to save your progress!</h3>
              <p className='disclaimer'>
                The dev takes no responsibility for any red packets lost or
                emotional damage caused by trash talks
              </p>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
