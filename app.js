const express = require('express');
const app = express();

app.use(express.json());

// Routes
const authRoutes = require('./src/routes/authRoutes');
const groupRoutes = require('./src/routes/groupRoutes');


app.use('/api/auth', authRoutes);
app.use('/api', groupRoutes);

// Swagger
const { swaggerUi, swaggerSpec } = require('./src/docs/swagger');

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: true
    }
  })
);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
  console.log("Swagger: http://localhost:3000/api-docs");
});