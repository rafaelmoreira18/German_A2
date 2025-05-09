import React, { useState, useEffect } from 'react';
import api from '../services/api';

function AddCard({ onCardAdded }) {
  const [formData, setFormData] = useState({
    german: '',
    english: '',
    category: 'general' // Valor padrão
  });
  const [categories, setCategories] = useState(['general', 'food', 'travel', 'house', 'family']);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      const newCard = await api.addCard(formData);
      setFormData({ german: '', english: '', category: 'general' });
      if (onCardAdded) onCardAdded(newCard);
    } catch (err) {
      setError('Erro ao adicionar cartão');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>Adicionar Novo Cartão</h2>
      {error && <div className="error">{error}</div>}
      <div>
        <label>Alemão:</label>
        <input 
          type="text" 
          name="german" 
          value={formData.german} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <label>Inglês:</label>
        <input 
          type="text" 
          name="english" 
          value={formData.english} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <label>Categoria:</label>
        <select 
          name="category" 
          value={formData.category} 
          onChange={handleChange}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={submitting}>
        {submitting ? 'Adicionando...' : 'Adicionar'}
      </button>
    </form>
  );
}

export default AddCard;