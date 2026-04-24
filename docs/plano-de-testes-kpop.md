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

## Observações

* O banco de dados é em memória e deve ser resetado antes de cada teste
* Utilizar fixtures para dados de teste
