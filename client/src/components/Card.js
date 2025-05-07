import React, { useState } from 'react';

function Card({ card }) {
  const [flipped, setFlipped] = useState(false);
  
  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
      <div className="card-inner">
        <div className="card-front">
          <h3>{card.german}</h3>
        </div>
        <div className="card-back">
          <h3>{card.english}</h3>
        </div>
      </div>
    </div>
  );
}











export default Card;