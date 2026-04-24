# User Stories — API de Grupos de K-Pop

## Épico: Cadastro de Grupos de K-Pop

---

## US1 — Criar grupo de K-Pop

**ID:** US1
**Como** administrador da plataforma
**Quero** cadastrar um novo grupo de K-Pop
**Para** que ele esteja disponível na base de dados

### Critérios de aceitação:

* Deve ser possível informar nome do grupo
* Deve ser possível informar agência (empresa)
* Deve ser possível informar ano de debut
* O sistema não deve permitir nomes duplicados
* Retornar status **201 Created** em caso de sucesso
* Retornar status **400 Bad Request** para dados inválidos

### Dependências: Nenhuma

---

## US2 — Listar grupos cadastrados

**ID:** US2
**Como** usuário da API
**Quero** visualizar todos os grupos cadastrados
**Para** consultar os dados disponíveis

### Critérios de aceitação:

* Retornar lista de grupos
* Deve suportar paginação (`page` e `limit`)
* Retornar status **200 OK**
* Se não houver grupos, retornar lista vazia

### Dependências: US1

---

## US3 — Buscar grupo por ID

**ID:** US3
**Como** usuário da API
**Quero** buscar um grupo específico pelo ID
**Para** ver seus detalhes

### Critérios de aceitação:

* Retornar dados completos do grupo
* Retornar status **200 OK** quando existir
* Retornar status **404 Not Found** quando não existir

### Dependências: US1

---

## US4 — Atualizar grupo de K-Pop

**ID:** US4
**Como** administrador da API
**Quero** atualizar informações de um grupo
**Para** manter os dados sempre atualizados

### Critérios de aceitação:

* Permitir atualizar nome, agência e ano de debut
* Não permitir duplicação de nome após atualização
* Retornar status **200 OK** quando atualizado com sucesso
* Retornar status **404 Not Found** se o grupo não existir

### Dependências: US1, US3

---

## US5 — Remover grupo

**ID:** US5
**Como** administrador da API
**Quero** remover um grupo de K-Pop
**Para** manter a base de dados limpa e atualizada

### Critérios de aceitação:

* Remover grupo pelo ID
* Retornar status **204 No Content** em caso de sucesso
* Retornar status **404 Not Found** se o grupo não existir

### Dependências: US1, US3

---

## US6 — Validação de dados

**ID:** US6
**Como** sistema da API
**Quero** validar os dados de entrada
**Para** garantir integridade das informações

### Critérios de aceitação:

* Nome do grupo é obrigatório
* Ano de debut deve ser um número válido
* Agência não pode ser vazia
* Retornar status **400 Bad Request** para dados inválidos

### Dependências: US1

---

## US7 — Controle de acesso (opcional)

**ID:** US7
**Como** administrador
**Quero** proteger endpoints sensíveis
**Para** evitar alterações não autorizadas

### Critérios de aceitação:

* Apenas usuários autenticados podem criar, editar e remover
* Usuário não autenticado recebe **401 Unauthorized**
* Usuário sem permissão recebe **403 Forbidden**

### Dependências: US1, US4, US5

---
