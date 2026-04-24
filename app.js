const express = require('express');
const app = express();

app.use(express.json());

const groupRoutes = require('./src/routes/groupRoutes');

app.use(groupRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando');
});