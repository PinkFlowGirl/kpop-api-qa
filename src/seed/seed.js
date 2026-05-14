require('dotenv').config();
const mongoose = require('mongoose');
const Group = require('../models/groupModel');
const groups = require('./groups');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ MongoDB conectado!');
  await Group.deleteMany();
  console.log('🗑️ Coleção limpa!');
  await Group.insertMany(groups);
  console.log(`✅ ${groups.length} grupos inseridos com sucesso!`);
  process.exit();
}

seed().catch(err => {
  console.error('❌ Erro:', err);
  process.exit(1);
});