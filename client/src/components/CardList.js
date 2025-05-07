import React from 'react';
import Card from './Card';

function CardList({ cards }) {
  if (!cards || cards.length === 0) {
    return <p>Nenhum cartão encontrado. Adicione seu primeiro cartão!</p>;
  }
  
  return (
    <div className="card-list">
      {cards.map(card => (
        <Card key={card._id || card.id} card={card} />
      ))}
    </div>
  );
}

export default CardList;