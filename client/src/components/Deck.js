import React, { useState, useEffect } from 'react';
import Card from './Card';
import api from '../services/api';
import '../styles/Deck.css';

function Deck() {
  const [currentCard, setCurrentCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [remainingCards, setRemainingCards] = useState(0);

  useEffect(() => {
    // Get total number of cards
    const fetchCardCount = async () => {
      try {
        const cards = await api.getCards();
        setRemainingCards(cards.length);
      } catch (err) {
        console.error('Erro ao obter contagem de cartões:', err);
      }
    };
    
    fetchCardCount();
  }, []);

  const drawCard = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const card = await api.getRandomCard();
      setCurrentCard(card);
    } catch (err) {
      setError('Erro ao tirar uma carta. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="deck-container">
      <div className="deck-info">
        <h2>Baralho de Cartões</h2>
        <p>Cartões disponíveis: {remainingCards}</p>
      </div>
      
      <div className="deck-actions">
        <button 
          className="draw-button" 
          onClick={drawCard} 
          disabled={loading || remainingCards === 0}
        >
          {loading ? 'Tirando carta...' : 'Tirar Carta'}
        </button>
      </div>
      
      {error && <div className="error">{error}</div>}
      
      <div className="card-display">
        {currentCard ? (
          <Card card={currentCard} />
        ) : (
          <div className="empty-card">
            <p>Tire uma carta para começar</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Deck;