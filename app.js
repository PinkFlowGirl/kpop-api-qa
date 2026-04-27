const express = require('express');
const app = express();

app.use(express.json());

// Rotas
const authRoutes = require('./src/routes/auth.routes');
const groupRoutes = require('./src/routes/group.routes');

app.use('/auth', authRoutes);
app.use('/api', groupRoutes);

// Swagger
const { swaggerUi, swaggerSpec } = require('./src/docs/swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Server
app.listen(3000, () => {
  console.log("🚀 Servidor rodando na porta 3000");
  console.log("📄 Swagger: http://localhost:3000/api-docs");
});