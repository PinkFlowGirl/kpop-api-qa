# Plano de Testes — API de Grupos de K-Pop

## Objetivo

Validar o funcionamento da API REST de cadastro de grupos de K-Pop, garantindo que os endpoints atendam aos critérios de aceitação definidos nas user stories.

---

## Escopo

Serão testados os seguintes endpoints:

* POST /groups
* GET /groups
* GET /groups/:id
* PUT /groups/:id
* DELETE /groups/:id

---

## Ambiente de Teste

* **URL Base:** http://localhost:3000
* **Banco de dados:** Em memória (resetar antes de cada teste)
* **Formato:** JSON

---

## Estratégia de Testes

Os testes serão realizados em três níveis:

* Testes funcionais (validação dos endpoints)
* Testes de validação de dados
* Testes de regras de negócio

Ferramentas sugeridas:

* Mocha
* Supertest
* Chai

---

## Dados de Teste (Fixtures)

```javascript
const groups = [
  { name: "BLACKPINK", company: "YG", debutYear: 2016 },
  { name: "BTS", company: "BigHit", debutYear: 2013 },
  { name: "TWICE", company: "JYP", debutYear: 2015 }
];
```

---

## Casos de Teste

### CT01 — Criar grupo com sucesso

**Endpoint:** POST /groups
**Entrada:**

```json
{
  "name": "BLACKPINK",
  "company": "YG",
  "debutYear": 2016
}
```

**Resultado esperado:**

* Status 201
* Retorno com ID gerado
* Dados corretos no response

---

### CT02 — Criar grupo com nome duplicado

**Pré-condição:** grupo já cadastrado

**Entrada:**

```json
{
  "name": "BLACKPINK",
  "company": "YG",
  "debutYear": 2016
}
```

**Resultado esperado:**

* Status 400
* Mensagem de erro indicando duplicidade

---

### CT03 — Criar grupo com dados inválidos

**Entrada:**

```json
{
  "name": "",
  "company": "",
  "debutYear": "abc"
}
```

**Resultado esperado:**

* Status 400
* Mensagens de validação

---

### CT04 — Listar grupos

**Endpoint:** GET /groups

**Resultado esperado:**

* Status 200
* Lista de grupos

---

### CT05 — Listar grupos vazio

**Pré-condição:** banco sem dados

**Resultado esperado:**

* Status 200
* Lista vazia []

---

### CT06 — Buscar grupo por ID existente

**Endpoint:** GET /groups/:id

**Resultado esperado:**

* Status 200
* Dados do grupo

---

### CT07 — Buscar grupo por ID inexistente

**Resultado esperado:**

* Status 404

---

### CT08 — Atualizar grupo com sucesso

**Endpoint:** PUT /groups/:id

**Resultado esperado:**

* Status 200
* Dados atualizados

---

### CT09 — Atualizar grupo inexistente

**Resultado esperado:**

* Status 404

---

### CT10 — Deletar grupo com sucesso

**Endpoint:** DELETE /groups/:id

**Resultado esperado:**

* Status 204

---

### CT11 — Deletar grupo inexistente

**Resultado esperado:**

* Status 404

---

## Critérios de Aceite

* Todos os endpoints retornam os status corretos
* Regras de negócio são respeitadas
* Validações impedem dados inválidos
* Testes automatizados passam com sucesso

---

## Cobertura de Testes

| Caso de Teste | Endpoint | Método | Status | Observações |
|---------------|----------|--------|--------|-------------|
| CT01 | POST /groups | POST | - | Pendente |
| CT02 | POST /groups | POST | - | Pendente |
| CT03 | POST /groups | POST | - | Pendente |
| CT04 | GET /groups | GET | - | Pendente |
| CT05 | GET /groups | GET | - | Pendente |
| CT06 | GET /groups/:id | GET | - | Pendente |
| CT07 | GET /groups/:id | GET | - | Pendente |
| CT08 | PUT /groups/:id | PUT | - | Pendente |
| CT09 | PUT /groups/:id | PUT | - | Pendente |
| CT10 | DELETE /groups/:id | DELETE | - | Pendente |
| CT11 | DELETE /groups/:id | DELETE | - | Pendente |

---

## Observações

* O banco de dados é em memória e deve ser resetado antes de cada teste
* Utilizar fixtures para dados de teste
