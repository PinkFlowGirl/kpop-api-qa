const express = require('express');
const app = express();

app.use(express.json());

const authRoutes = require('./src/routes/authRoutes');
const groupRoutes = require('./src/routes/groupRoutes');

app.use('/api', groupRoutes);
app.use('/', authRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});