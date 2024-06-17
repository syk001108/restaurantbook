import React from 'react';
import './RandomPopup.css';

const RandomPopup = ({ place, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>{place.place_name}</h2>
        <p>{place.address_name}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default RandomPopup;
