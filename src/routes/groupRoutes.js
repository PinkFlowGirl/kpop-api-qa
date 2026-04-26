const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const groups = [
  { id: 1, name: 'BTS' },
  { id: 2, name: 'BLACKPINK' }
];

router.get('/groups', authMiddleware, (req, res) => {
  res.json(groups);
});

router.get('/groups/:id', authMiddleware, (req, res) => {
  const group = groups.find(g => g.id == req.params.id);

  if (!group) {
    return res.status(404).json({ message: 'Grupo não encontrado' });
  }

  res.json(group);
});

module.exports = router;