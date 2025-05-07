import React, { useState, useEffect } from 'react';
import api from '../services/api';

function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await api.getCategories();
      setCategories(data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar categorias');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addedCategory = await api.addCategory(newCategory);
      setCategories([...categories, addedCategory]);
      setNewCategory({ name: '', description: '' });
    } catch (err) {
      setError('Erro ao adicionar categoria');
    }
  };

  const handleChange = (e) => {
    setNewCategory({
      ...newCategory,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <p>Carregando categorias...</p>;

  return (
    <div className="category-manager">
      <h2>Gerenciar Categorias</h2>
      {error && <div className="error">{error}</div>}
      
      <div className="category-list">
        <h3>Categorias Existentes</h3>
        {categories.length === 0 ? (
          <p>Nenhuma categoria encontrada</p>
        ) : (
          <ul>
            {categories.map(category => (
              <li key={category._id}>{category.name}</li>
            ))}
          </ul>
        )}
      </div>
      
      <form onSubmit={handleSubmit}>
        <h3>Adicionar Nova Categoria</h3>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="name"
            value={newCategory.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <input
            type="text"
            name="description"
            value={newCategory.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Adicionar Categoria</button>
      </form>
    </div>
  );
}

export default CategoryManager;