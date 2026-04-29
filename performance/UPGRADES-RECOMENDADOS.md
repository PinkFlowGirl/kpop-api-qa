# Upgrades Recomendados - Implementação

## 1. Adicionar Error Handler Global

**Arquivo:** `src/middlewares/errorHandler.js`

```javascript
module.exports = (err, req, res, next) => {
  console.error('❌ Erro:', err.message);
  
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(status).json({
    ok: false,
    error: message,
    status: status,
    timestamp: new Date().toISOString()
  });
};
```

**Usar em app.js:**
```javascript
app.use(errorHandler);
```

---

## 2. Adicionar Rate Limiting

**Instalação:**
```bash
npm install express-rate-limit
```

**Arquivo:** `src/middlewares/rateLimiter.js`

```javascript
const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,                  // 100 requisições por IP
  message: 'Muitas requisições, tente novamente mais tarde',
  standardHeaders: true,     // Retornar info em `RateLimit-*` headers
  legacyHeaders: false,      // Desabilitar `X-RateLimit-*` headers
});
```

**Usar em app.js:**
```javascript
const rateLimiter = require('./src/middlewares/rateLimiter');
app.use('/api/', rateLimiter);
```

---

## 3. Adicionar Validação de Input

**Instalação:**
```bash
npm install joi
```

**Arquivo:** `src/validators/groupValidator.js`

```javascript
const Joi = require('joi');

const groupSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Nome é obrigatório',
      'string.min': 'Nome deve ter pelo menos 2 caracteres',
      'string.max': 'Nome não pode exceder 100 caracteres'
    }),
    
  debutYear: Joi.number()
    .integer()
    .min(1990)
    .max(new Date().getFullYear())
    .required()
    .messages({
      'number.min': 'Ano de debut deve ser após 1990',
      'number.max': 'Ano de debut não pode ser no futuro'
    }),
    
  fandom: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Fandom é obrigatório',
      'string.min': 'Fandom deve ter pelo menos 2 caracteres'
    })
});

const validateGroup = (data) => {
  const { error, value } = groupSchema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
  return value;
};

module.exports = { validateGroup };
```

**Usar em groupController.js:**
```javascript
const { validateGroup } = require('../validators/groupValidator');

exports.create = async (req, res, next) => {
  try {
    const validatedData = validateGroup(req.body);
    const newGroup = groupService.create(validatedData);
    res.status(201).json(newGroup);
  } catch (error) {
    next(error);
  }
};
```

---

## 4. Adicionar Logging com Winston

**Instalação:**
```bash
npm install winston morgan
```

**Arquivo:** `src/utils/logger.js`

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

module.exports = logger;
```

**Usar em app.js:**
```javascript
const morgan = require('morgan');
const logger = require('./src/utils/logger');

app.use(morgan('combined', { stream: { write: msg => logger.info(msg) } }));
```

---

## 5. Melhorar Database - Adicionar SQLite

**Instalação:**
```bash
npm install sqlite3 better-sqlite3
```

**Arquivo:** `src/models/database-sqlite.js`

```javascript
const Database = require('better-sqlite3');
const db = new Database('kpop.db');

// Criar tabela
db.exec(`
  CREATE TABLE IF NOT EXISTS groups (
    _id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    debutYear INTEGER NOT NULL,
    fandom TEXT NOT NULL,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE INDEX IF NOT EXISTS idx_name ON groups(name);
`);

module.exports = db;
```

---

## 6. Implementar Paginação

**Arquivo:** `src/services/groupService.js`

```javascript
const getPaginated = (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const groups = db.prepare('SELECT * FROM groups LIMIT ? OFFSET ?')
    .all(limit, offset);
  const total = db.prepare('SELECT COUNT(*) as count FROM groups').get();
  
  return {
    data: groups,
    pagination: {
      page,
      limit,
      total: total.count,
      pages: Math.ceil(total.count / limit)
    }
  };
};

module.exports = { getPaginated };
```

**Usar na rota:**
```javascript
router.get('/groups', authMiddleware, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const result = groupService.getPaginated(page, limit);
  res.json(result);
});
```

---

## 7. Adicionar Health Check Endpoint

**Arquivo:** `src/routes/healthRoutes.js`

```javascript
const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
```

**Usar em app.js:**
```javascript
app.use('/api', require('./src/routes/healthRoutes'));
```

---

## 8. Adicionar Testes de Carga Mais Realistas

**Arquivo:** `performance/load-test-advanced.js`

```javascript
import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

export const options = {
  stages: [
    { duration: '10s', target: 10 },   // Ramp-up gradual
    { duration: '30s', target: 20 },   // Carga sustentada
    { duration: '5s', target: 100 },   // Spike extremo
    { duration: '10s', target: 0 },    // Ramp-down
  ],
  thresholds: {
    'http_req_duration': ['p(99)<500'],
    'http_req_failed': ['rate<0.05'],
  },
};

const BASE_URL = 'http://localhost:3000/api';

export default function() {
  // 80% operações de leitura
  if (Math.random() < 0.8) {
    http.get(`${BASE_URL}/groups`, {
      headers: { 'Authorization': `Bearer ${__ENV.TOKEN}` }
    });
  } else {
    // 20% operações de escrita
    http.post(`${BASE_URL}/groups`, 
      { name: `Group ${Date.now()}` },
      { headers: { 'Authorization': `Bearer ${__ENV.TOKEN}` } }
    );
  }
  
  sleep(1);
}
```

---

## 9. Criar Workflow CI/CD para Testes de Performance

**Arquivo:** `.github/workflows/performance-tests.yml`

```yaml
name: Performance Tests

on:
  push:
    branches: [main, develop]
  schedule:
    - cron: '0 2 * * *'  # Diariamente às 2 AM

jobs:
  performance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Start server
        run: npm start &
        
      - name: Wait for server
        run: sleep 5
      
      - name: Install k6
        run: sudo apt-get update && sudo apt-get install -y k6
      
      - name: Run performance tests
        run: k6 run performance/load-test.js
        
      - name: Comment PR with results
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '✅ Testes de performance passaram!'
            })
```

---

## 📊 Plano de Implementação

### Semana 1 - Crítico ⚠️
- [ ] Adicionar error handler global
- [ ] Implementar rate limiting
- [ ] Adicionar validação com Joi

### Semana 2 - Importante 🟡
- [ ] Adicionar logging com Winston
- [ ] Migrar para SQLite (ou MongoDB)
- [ ] Implementar paginação

### Semana 3 - Maintenance 🔧
- [ ] Adicionar health check endpoint
- [ ] Criar testes de carga avançados
- [ ] Setup CI/CD com GitHub Actions

---

## 🚀 Comando para Executar Depois de Upgrades

```bash
# Instalar todas as dependências recomendadas
npm install express-rate-limit joi winston morgan better-sqlite3

# Testar novamente
npm start &
k6 run performance/load-test.js
```

---

**Última atualização:** 2026-04-29
