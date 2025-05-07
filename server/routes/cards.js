const express = require('express');
const router = express.Router();
const Card = require('../models/Card');

// GET all cards
router.get('/', async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/random', async (req, res) =>{

  try{
   const count = await Card.countDocuments();
   
   if (count === 0) 
   {
       return res.status(404).json({message: 'nenhum cartão encontrado'});
   }
    
   const random = Math.floor(Math.random() * count);

   const card = await Card.findOne().skip(random);

   res.json(card);

  } catch (err){
   res.status(500).json({message: err.message});
  }
} );


// GET a especific card
router.get('/:id', async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ message: 'Cartão não encontrado' });
    res.json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new card
router.post('/', async (req, res) => {
  const card = new Card({
    german: req.body.german,
    english: req.body.english,
    category: req.body.category,
    difficulty: req.body.difficulty
  });

  try {
    const newCard = await card.save();
    res.status(201).json(newCard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT Update card
router.put('/:id', async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ message: 'Cartão não encontrado' });
    
    if (req.body.german) card.german = req.body.german;
    if (req.body.english) card.english = req.body.english;
    if (req.body.category) card.category = req.body.category;
    if (req.body.difficulty) card.difficulty = req.body.difficulty;
    
    const updatedCard = await card.save();
    res.json(updatedCard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE card
router.delete('/:id', async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ message: 'Cartão não encontrado' });
    
    await card.deleteOne();
    res.json({ message: 'Cartão removido' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




module.exports = router;