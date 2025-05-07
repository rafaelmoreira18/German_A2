import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = {
  // CARTÕES
  // Get all cards
  getCards: async () => {
    try {
      const response = await axios.get(`${API_URL}/cards`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar cartões:', error);
      throw error;
    }
  },
  
  // Get epecific cards
  getCard: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/cards/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar cartão ${id}:`, error);
      throw error;
    }
  },
  
  // Add a new card
  addCard: async (cardData) => {
    try {
      const response = await axios.post(`${API_URL}/cards`, cardData);
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar cartão:', error);
      throw error;
    }
  },
  
  // update existent card
  updateCard: async (id, cardData) => {
    try {
      const response = await axios.put(`${API_URL}/cards/${id}`, cardData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar cartão ${id}:`, error);
      throw error;
    }
  },
  
  // DELETE card
  deleteCard: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/cards/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao excluir cartão ${id}:`, error);
      throw error;
    }
  },
  
  // Get card by category
  getCardsByCategory: async (category) => {
    try {
      const response = await axios.get(`${API_URL}/cards?category=${category}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar cartões da categoria ${category}:`, error);
      throw error;
    }
  },
  
  // category
  // GET all categories
  getCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      throw error;
    }
  },
  
  // Add new category
  addCategory: async (categoryData) => {
    try {
      const response = await axios.post(`${API_URL}/categories`, categoryData);
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error);
      throw error;
    }
  },
  
  // UPDATE existent category 
  updateCategory: async (id, categoryData) => {
    try {
      const response = await axios.put(`${API_URL}/categories/${id}`, categoryData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar categoria ${id}:`, error);
      throw error;
    }
  },
  
  // DELETE category
  deleteCategory: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao excluir categoria ${id}:`, error);
      throw error;
    }
  },

  getRandomCard: async () => {
   
    try{
      const response = await axios.get(`${API_URL}/cards/random`);
      return response.data  
    } catch (error) {
     console.error('Erro ao buscar carta aleatoria:', error);
     throw error;
    }
    
 }
};



export default api;