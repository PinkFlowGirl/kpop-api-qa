const express = require('express');
const app = express();

app.use(express.json());

const authRoutes = require('./src/routes/authRoutes');
const groupRoutes = require('./src/routes/groupRoutes');

app.use('/api/auth', authRoutes);
app.use('/api', groupRoutes);

// Rota base
app.get('/', (req, res) => {
  res.send('Kpop API is running');
});


const { swaggerUi, swaggerSpec } = require('./src/config/swagger');

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: true
    }
  })
);

// Server
if (require.main === module) {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Swagger: http://localhost:${PORT}/api-docs`);
  });
}

module.exports = app;