# API de Cadastro de Grupos de K-Pop

## Objetivo

API REST desenvolvida com Node.js e Express para cadastro e gerenciamento de grupos de K-Pop.

---

## Arquitetura

O projeto segue uma arquitetura em camadas:

* Routes → definição dos endpoints
* Controllers → tratamento de requisições e respostas
* Services → regras de negócio
* Models → estrutura de dados

---

## Tecnologias utilizadas

* Node.js
* Express
* JavaScript

---

## Funcionalidades (User Stories)

### US1 — Criar grupo de K-Pop

Como administrador da plataforma
Quero cadastrar um novo grupo
Para que ele esteja disponível na base de dados

Critérios de aceitação:

* Deve ser possível informar nome do grupo
* Deve ser possível informar agência (empresa)
* Deve ser possível informar ano de debut
* Não permitir nomes duplicados
* Retornar 201 Created

---

### US2 — Listar grupos cadastrados

Como usuário da API
Quero visualizar todos os grupos cadastrados

Critérios de aceitação:

* Retornar lista de grupos
* Suportar paginação (page e limit)
* Retornar 200 OK
* Retornar lista vazia se não houver dados

---

### US3 — Buscar grupo por ID

Como usuário da API
Quero buscar um grupo específico

Critérios de aceitação:

* Retornar dados completos
* Retornar 200 OK quando existir
* Retornar 404 Not Found quando não existir

---

### US4 — Atualizar grupo

Como administrador
Quero atualizar informações de um grupo

Critérios de aceitação:

* Permitir atualizar nome, agência e ano de debut
* Não permitir duplicação de nome
* Retornar 200 OK
* Retornar 404 Not Found se não existir

---

### US5 — Remover grupo

Como administrador
Quero remover um grupo

Critérios de aceitação:

* Remover pelo ID
* Retornar 204 No Content
* Retornar 404 Not Found se não existir

---

### US6 — Validação de dados

Como sistema
Quero validar os dados de entrada

Critérios de aceitação:

* Nome obrigatório
* Ano de debut deve ser numérico
* Agência não pode ser vazia
* Retornar 400 Bad Request

---

### US7 — Controle de acesso (opcional)

Como administrador
Quero proteger endpoints sensíveis

Critérios de aceitação:

* Apenas usuários autenticados podem criar/editar/remover
* Retornar 401 Unauthorized
* Retornar 403 Forbidden

---

## Endpoints (planejados)

| Método | Endpoint    | Descrição       |
| ------ | ----------- | --------------- |
| POST   | /groups     | Criar grupo     |
| GET    | /groups     | Listar grupos   |
| GET    | /groups/:id | Buscar por ID   |
| PUT    | /groups/:id | Atualizar grupo |
| DELETE | /groups/:id | Remover grupo   |

---

## Status do Projeto

Em desenvolvimento
POST /groups implementado

Próximos passos:

* Validação de dados
* Listagem de grupos
* Testes automatizados
* Documentação com Swagger

---

## Observações

Os dados são armazenados em memória (sem banco de dados externo), com foco em aprendizado de arquitetura, testes e APIs REST.
