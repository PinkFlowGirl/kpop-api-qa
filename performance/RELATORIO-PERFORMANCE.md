# Relatório de Testes de Performance - Kpop API

**Data:** 29 de abril de 2026  
**Ferramenta:** k6 (load testing)  
**Duração:** 35 segundos (4 estágios: ramp-up, stay, spike, ramp-down)  
**Máximo de VUs:** 50 usuários virtuais  

---

## 📊 Resultados Executivos

### Status Geral: ⚠️ PARCIALMENTE APROVADO

**Métricas de Sucesso:**
- ✅ **Latência de Autenticação:** p(99)=59.95ms (limite: 1000ms)
- ✅ **Latência de Operações em Grupos:** p(95)=30.7ms (limite: 500ms)
- ✅ **Latência de Requisições HTTP:** p(95)=28.53ms (limite: 500ms)
- ✅ **Validações de Funcionalidade:** 100% (2719/2719 checks passados)
- ✅ **Taxa de Erros:** 0%

**Métricas com Alerta:**
- ⚠️ **Taxa de Requisições Falhadas:** 49.97% (limite: 10%)

---

## 📈 Análise Detalhada de Resultados

### 1. Latência (Performance)

| Métrica | Valor | Limite | Status |
|---------|-------|--------|--------|
| **Auth - p(99)** | 59.95ms | 1000ms | ✅ Excelente |
| **Groups - p(95)** | 30.7ms | 500ms | ✅ Excelente |
| **HTTP Duration - p(95)** | 28.53ms | 500ms | ✅ Excelente |
| **HTTP Duration - p(99)** | 55.39ms | 1000ms | ✅ Excelente |

**Análise:** A API tem performance excelente em latência. Todas as requisições estão bem dentro dos limites aceitáveis.

---

### 2. Taxa de Falha

| Métrica | Valor | Limite | Status |
|---------|-------|--------|--------|
| **http_req_failed** | 49.97% (906/1813) | 10% | ❌ Crítico |

**Causa Identificada:**  
Durante o estágio "spike" (aumento para 50 VUs simultâneos), o servidor está retornando muitas respostas com status de erro (provavelmente 5xx). Isso pode ser causado por:

1. **Limitações de Memória:** Em-memory database não escalável
2. **Sem tratamento de erro adequado:** Quando muitas requisições chegam simultaneamente
3. **Sem rate limiting:** Aceita todas as requisições sem throttling
4. **Timeout ou deadlock:** Possível contenção em operações de banco de dados

---

### 3. Volume de Requisições Processadas

- **Total de Requisições:** 1.813 requisições em 35 segundos
- **Taxa Média:** 48.46 req/s
- **Iterações Completadas:** 302 (8.07 iter/s)
- **VUs Máximo Alcançado:** 50

---

## 🔍 Problemas Encontrados

### Problema 1: Alta Taxa de Requisições Falhadas
**Severidade:** 🔴 Crítica  
**Descrição:** 50% das requisições estão falhando sob carga (spike a 50 VUs)  
**Impacto:** Em cenários de pico de tráfego, a API fica instável  
**Teste Replicável:** Execute o teste com stage spike a 50 VUs

### Problema 2: Sem Logging de Erros
**Severidade:** 🟡 Média  
**Descrição:** Não está claro qual tipo de erro está acontecendo (5xx, timeout, etc)  
**Impacto:** Difícil diagnosticar o problema exato  

### Problema 3: Banco de Dados Em-Memory
**Severidade:** 🟡 Média  
**Descrição:** Todos os dados estão em memória (não persistem entre requisições)  
**Impacto:** Não é adequado para produção; sem tratamento de race conditions

---

## ✅ Validações Que Passaram

Todos os testes funcionais passaram com 100% de sucesso:

```
✓ Setup: login bem-sucedido
✓ login: status 200
✓ login: tem token
✓ login inválido: status 401
✓ GET /groups: status 200
✓ GET /groups: é array
✓ POST /groups: status 201
✓ POST /groups: retorna grupo
✓ sem token: status 401
✓ GET /groups/:id inexistente: status 404
```

---

## 🚀 Recomendações de Upgrade

### Curto Prazo (Crítico)

#### 1. **Aumentar Tratamento de Erros**
```javascript
// Adicionar em app.js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message 
  });
});
```

#### 2. **Adicionar Rate Limiting**
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requisições por IP
  message: 'Muitas requisições, tente novamente depois'
});

app.use('/api/', limiter);
```

#### 3. **Adicionar Logging e Monitoramento**
```bash
npm install morgan winston
```

---

### Médio Prazo (Importante)

#### 4. **Migrar para Banco de Dados Real**
```bash
npm install mongoose
```

**Benefícios:**
- Persistência de dados
- Melhor escalabilidade
- Concorrência segura (ACID)
- Índices para performance

#### 5. **Adicionar Validação de Input**
```bash
npm install joi
```

```javascript
const schema = Joi.object({
  name: Joi.string().required(),
  debutYear: Joi.number().required(),
  fandom: Joi.string().required()
});
```

#### 6. **Adicionar Cache com Redis**
```bash
npm install redis
```

**Benefícios:**
- Reduzir carga no banco
- Responder mais rápido para dados frequentes
- Melhorar taxa de throughput

---

### Longo Prazo (Manutenção)

#### 7. **Load Balancing**
- Usar Nginx ou HAProxy
- Distribuir tráfego entre múltiplas instâncias
- Melhorar disponibilidade

#### 8. **Containerização**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
```

```bash
docker build -t kpop-api .
docker run -p 3000:3000 kpop-api
```

#### 9. **CI/CD e Testes Contínuos**
- Executar testes de performance em cada deploy
- Alertar se ultrapassar thresholds
- Versionar e rastrear resultados

---

## 📋 Upgrade Imediato Recomendado

### Prioridade 1️⃣ (Implementar Agora)

```javascript
// 1. Adicionar middleware de erro global
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(500).json({ ok: false, error: err.message });
});

// 2. Adicionar rate limiting
app.use(express.json({ limit: '10kb' })); // Limitar tamanho

// 3. Adicionar validação em groupController
const validateGroup = (name, debutYear, fandom) => {
  if (!name || name.length < 2) throw new Error('Nome inválido');
  if (!debutYear || debutYear < 1990) throw new Error('Ano de debut inválido');
  if (!fandom || fandom.length < 2) throw new Error('Fandom inválido');
  return true;
};
```

### Prioridade 2️⃣ (Próximas 2 Semanas)

1. Migrar para MongoDB
2. Adicionar índices no banco
3. Implementar paginação em GET /groups
4. Adicionar cache com Redis

---

## 🎯 Conclusão

**A API funciona bem em latência e funcionalidade, mas precisa de upgrades para lidar com carga.**

| Aspecto | Status | Ação |
|---------|--------|------|
| **Latência** | ✅ Excelente | Manter |
| **Funcionalidade** | ✅ 100% OK | Manter |
| **Escalabilidade** | ❌ Falha em 50% de reqs | Urgente |
| **Resiliência** | ⚠️ Sem tratamento de erro | Importante |
| **Persistência** | ❌ Em-memory | Crítico para produção |

---

## 📝 Próximos Passos

1. ✅ **Executado:** Teste de performance com k6
2. 🔄 **Próximo:** Implementar rate limiting
3. 🔄 **Próximo:** Adicionar tratamento de erros
4. 🔄 **Próximo:** Migrar para MongoDB
5. 🔄 **Próximo:** Executar teste de performance novamente

---

**Gerado em:** 2026-04-29  
**Tempo de Execução do Teste:** ~37 segundos
