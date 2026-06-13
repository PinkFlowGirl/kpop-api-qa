require('dotenv').config();
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  });
  console.log('✅ MongoDB conectado!');
}

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('❌ Erro ao conectar MongoDB:', err);
    res.status(500).json({ ok: false, message: 'Erro de conexão com o banco de dados' });
  }
});

const authRoutes = require('./src/routes/authRoutes');
const groupRoutes = require('./src/routes/groupRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
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

// 404 - Rota não encontrada
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: `Rota não encontrada: ${req.method} ${req.originalUrl}`
  });
});

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error('❌ Erro não tratado:', err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    ok: false,
    message: err.message || 'Erro interno do servidor'
  });
});

module.exports = app;
