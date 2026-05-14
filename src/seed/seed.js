require('dotenv').config();
const mongoose = require('mongoose');
const Group = require('../models/groupModel');
const groups = require('./groups');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ MongoDB conectado!');

  let inseridos = 0;
  let atualizados = 0;

  for (const group of groups) {
    const result = await Group.findOneAndUpdate(
      { name: group.name },
      group,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    if (result.createdAt === result.updatedAt) {
      inseridos++;
    } else {
      atualizados++;
    }
  }

  console.log(`✅ ${inseridos} grupos inseridos!`);
  console.log(`🔄 ${atualizados} grupos atualizados!`);
  console.log(`📊 Total processado: ${groups.length} grupos`);
  process.exit();
}

seed().catch(err => {
  console.error('❌ Erro:', err);
  process.exit(1);
});