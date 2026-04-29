# Kpop API CRUD

API REST para gerenciamento de grupos de K-pop, com autenticação JWT, testes automatizados e integração contínua.

---

## Descrição

Esta API permite criar, listar, atualizar e deletar grupos de K-pop.  
O projeto foi desenvolvido com foco em qualidade de testes, cobrindo o ciclo completo de QA, incluindo testes automatizados, documentação e CI/CD.

**Status:** ✅ Todos os testes passando | 6/6 testes automatizados OK

---

## Tecnologias

- Node.js
- Express
- Mocha
- Chai
- Supertest
- JSON Web Token (JWT)
- Swagger
- GitHub Actions

---

## Como Usar

### 1. Clonar e instalar

```bash
git clone https://github.com/PinkFlowGirl/kpop-api.git
cd kpop-api
npm install
```

### 2. Rodar o servidor

```bash
npm start
```

Servidor rodando em: `http://localhost:3000`

### 3. Rodar testes

```bash
npm test
```

### Documentação Swagger

- A documentação da API está disponível em:

http://localhost:3000/api-docs

Contém todos os endpoints, exemplos de requisição e resposta.

## Autenticação

A API utiliza autenticação com JWT.

### Obter Token

```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "123"
}
```

Resposta:
```json
{
  "ok": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Usar Token em Requisições

Para acessar rotas protegidas, adicione no header:

```
Authorization: Bearer {token}
```

## Endpoints da API

### Autenticação
| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|---------------|
| POST | `/api/auth/login` | Login e obter token | Não |

### Grupos (CRUD)
| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|---------------|
| GET | `/api/groups` | Listar todos os grupos | Bearer Token |
| POST | `/api/groups` | Criar novo grupo | Bearer Token |
| GET | `/api/groups/:id` | Buscar grupo por ID | Bearer Token |
| PUT | `/api/groups/:id` | Atualizar grupo | Bearer Token |
| DELETE | `/api/groups/:id` | Deletar grupo | Bearer Token |

### Exemplo de Fluxo Completo

1. **Login**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"123"}'
```

2. **Criar Grupo**
```bash
curl -X POST http://localhost:3000/api/groups \
  -H "Authorization: Bearer {TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"name":"IVE","debutYear":2021,"fandom":"DIVE"}'
```

3. **Listar Grupos**
```bash
curl -X GET http://localhost:3000/api/groups \
  -H "Authorization: Bearer {TOKEN}"
```

### Integração Contínua (CI/CD)

- O projeto utiliza GitHub Actions para execução automática dos testes.

### A cada push ou pull request:

- As dependências são instaladas
- Os testes automatizados são executados
- O resultado é validado automaticamente

### Testes

## O projeto contempla:

- Testes automatizados de API
- Testes de integração
- Testes exploratórios
- Testes de performance (k6)

### Os testes cobrem:

- CRUD de grupos
- Validação de dados
- Autenticação JWT
- Tratamento de erros

### Estrutura do Projeto

src/
routes/
controllers/
test/
docs/

### Documentação de Testes

## Os documentos de QA estão disponíveis na pasta docs/:

Test Plan: docs/test-plan.md
Test Cases: docs/test-cases.md
User Stories: docs/user-stories.md
Bug Report (exemplo)
BUG-001: permite criação de grupo com nome vazio
BUG-002: erro 500 em requisição inválida

### Considerações

Este projeto foi desenvolvido com foco em boas práticas de qualidade de software, incluindo organização de testes, automação e validação contínua.

### Autor
```
