import React, { useState, useEffect } from 'react';
import './App.css';
import CardList from './components/CardList';
import AddCard from './components/AddCard';
import CategoryFilter from './components/CategoryFilter';
import Deck from './components/Deck';
import api from './services/api';

function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['general', 'food', 'travel', 'business', 'family']);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mode, setMode] = useState('manage'); // 'manage' ou 'deck'
  
  useEffect(() => {
    const loadCards = async () => {
      try {
        const data = await api.getCards();
        setCards(data);
      } catch (error) {
        console.error('Erro ao carregar cartões:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCards();
  }, []);
  
  const handleCardAdded = (newCard) => {
    setCards([...cards, newCard]);
  };
  
  const filteredCards = selectedCategory === 'all' 
    ? cards 
    : cards.filter(card => card.category === selectedCategory);
  
  return (
    <div className="App">
      <header>
        <h1>Cartões de Alemão-Inglês</h1>
        <div className="mode-selector">
          <button 
            className={mode === 'manage' ? 'active' : ''} 
            onClick={() => setMode('manage')}
          >
            Gerenciar Cartões
          </button>
          <button 
            className={mode === 'deck' ? 'active' : ''} 
            onClick={() => setMode('deck')}
          >
            Modo Baralho
          </button>
        </div>
      </header>
      
      <main>
        {mode === 'manage' ? (
          <>
            <AddCard onCardAdded={handleCardAdded} />
            <CategoryFilter 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            {loading ? (
              <p>Carregando cartões...</p>
            ) : (
              <CardList cards={filteredCards} />
            )}
          </>
        ) : (
          <Deck />
        )}
      </main>
    </div>
  );
}

export default App;