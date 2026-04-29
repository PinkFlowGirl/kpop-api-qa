# Test Plan – Kpop API

## Objetivo
Garantir a qualidade da API de gerenciamento de grupos de K-pop, validando funcionalidades, segurança, estabilidade e performance.

---

## Escopo

### Em escopo:
- CRUD de grupos com autenticação JWT
- Autenticação com JWT (login)
- Validação de dados de entrada
- Respostas HTTP corretas
- Testes de integração
- Testes de performance (k6)
- Testes de segurança (JWT)

### Fora de escopo:
- Interface gráfica
- Banco de dados persistente
- Deployment em produção

---

## Tipos de Teste

| Tipo | Status | Quantidade | Ferramenta |
|------|--------|-----------|-----------|
| Testes Unitários | ✅ | 6 | Mocha + Chai |
| Testes de Integração | ✅ | 6 | Supertest |
| Testes de API | ✅ | 6 | Supertest |
| Testes de Performance | ⏳ | - | k6 |
| Testes Exploratórios | ⏳ | - | Manual |
| Testes de Segurança | ✅ | 4 | Mocha + Chai |

---

## Critérios de Aceite

- ✅ API responde corretamente (200, 201, 400, 401, 404)
- ✅ Dados validados corretamente
- ✅ Rotas protegidas com JWT obrigatório
- ✅ Testes automatizados passando (6/6)
- ✅ Documentação Swagger atualizada
- ✅ CI/CD executando com sucesso

---

## Ambiente

- **Node.js:** v18.20.8
- **Framework:** Express.js
- **Banco de Dados:** Em memória
- **Servidor:** localhost:3000
- **Documentação:** Swagger UI

---

## Ferramentas

| Ferramenta | Versão | Propósito |
|-----------|--------|----------|
| Mocha | latest | Test Framework |
| Chai | latest | Assertions |
| Supertest | latest | API Testing |
| Swagger | latest | Documentação |
| k6 | - | Performance |
| GitHub Actions | - | CI/CD |

---

## Estratégia de Testes

### 1. Testes Automatizados (Mocha + Chai + Supertest)
- **Executação:** `npm test`
- **Tempo:** ~92ms
- **Cobertura:** 83% (10/12 testes)
- **Status:** ✅ 6/6 testes passando

### 2. Testes Manuais via Swagger
- **URL:** http://localhost:3000/api-docs
- **Método:** Interface interativa

### 3. Testes de Performance (k6)
- **Arquivo:** `performance/load-test.js`
- **Status:** ⏳ Planejado

---

## Riscos e Mitigações

| Risco | Impacto | Mitigação |
|------|--------|----------|
| Banco em memória (dados perdidos ao reiniciar) | Alto | Usar banco persistente em produção |
| Falhas em autenticação JWT | Alto | Testes de segurança obrigatórios |
| Falta de validação de dados | Médio | Implementar validação server-side |
| Performance sob carga | Médio | Testes com k6 planejados |

---

## Execução de Testes

### Rodar todos os testes
```bash
npm test
```

### Saída esperada
```
Kpop API - Groups
  ✔ Deve fazer login e retornar token (38ms)
  ✔ Deve listar grupos
  ✔ Deve criar um grupo
  ✔ Deve buscar grupo por ID
  ✔ Deve atualizar grupo
  ✔ Deve deletar grupo

6 passing (92ms)
```

---

## Relatório de Cobertura

| Endpoint | Método | Testes | Status |
|----------|--------|--------|--------|
| /api/auth/login | POST | CT01, CT02 | ✅ |
| /api/groups | GET | CT06 | ✅ |
| /api/groups | POST | CT05 | ✅ |
| /api/groups/:id | GET | CT07, CT08 | ✅ |
| /api/groups/:id | PUT | CT09 | ✅ |
| /api/groups/:id | DELETE | CT10 | ✅ |

---

## Próximos Passos

1. ✅ Testes de autenticação e CRUD
2. ⏳ Testes de validação de dados
3. ⏳ Testes de performance (k6)
4. ⏳ Testes exploratórios
5. ⏳ Deploy em staging/produção