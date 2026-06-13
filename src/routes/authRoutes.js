const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET não definido. Configure a variável de ambiente antes de iniciar o servidor.');
}

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      ok: false,
      message: 'Os campos "username" e "password" são obrigatórios'
    });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({
      ok: false,
      message: 'Credenciais inválidas'
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({
      ok: false,
      message: 'Credenciais inválidas'
    });
  }

  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  return res.status(200).json({
    ok: true,
    token
  });
});

module.exports = router;