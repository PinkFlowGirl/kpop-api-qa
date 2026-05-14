require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    bufferCommands: false,
  });
  isConnected = true;
  console.log('✅ MongoDB conectado!');
}

connectDB().catch(err => console.error('❌ Erro ao conectar MongoDB:', err));

const authRoutes = require('./src/routes/authRoutes');
const groupRoutes = require('./src/routes/groupRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.get('/', (req, res) => {
  res.send('Kpop API is running');
});
const { swaggerUi, swaggerSpec } = require('./src/config/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    persistAuthorization: true
  },
  customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-standalone-preset.min.js'
  ]
}));
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Swagger: http://localhost:${PORT}/api-docs`);
  });
}
module.exports = app;