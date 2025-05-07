const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/cards', require('./routes/cards'));

// Conexão com o banco de dados
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// ...
app.use('/api/cards', require('./routes/cards'));
app.use('/api/categories', require('./routes/categories'));
// ...


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});