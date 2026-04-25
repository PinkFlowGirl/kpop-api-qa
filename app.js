const express = require('express');
const app = express();

app.use(express.json());

const groupRoutes = require('./src/routes/groupRoutes');

app.use('/api', groupRoutes);

const { swaggerUi, swaggerDocument } = require('./src/docs/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log('Servidor rodando');
});