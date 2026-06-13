const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
require('dotenv').config();

async function seedUser() {
  await mongoose.connect(process.env.MONGODB_URI);

  const existing = await User.findOne({ username: 'admin' });
  if (existing) {
    console.log('Usuário admin já existe, pulando seed.');
    await mongoose.disconnect();
    return;
  }

  const hash = await bcrypt.hash('Admin2026!', 10);
  await User.create({ username: 'admin', password: hash });
  console.log('Usuário admin criado com sucesso.');
  await mongoose.disconnect();
}

seedUser().catch(console.error);