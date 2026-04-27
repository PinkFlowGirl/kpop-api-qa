# CASOS DE TESTE – KPOP API

## 1. Informações Gerais

Projeto: Kpop API REST
Versão: v1.0.0
Tipo: API REST
Ambiente: Local (localhost:3000)
Ferramentas: Swagger, Postman, Curl

---

## 2. Padrão dos Casos de Teste

Cada caso de teste segue:

* ID
* Título
* Pré-condições
* Passos
* Dados de entrada
* Resultado esperado

---

# AUTENTICAÇÃO

## CT01 - Login com credenciais válidas

Pré-condição: API rodando

Passos:

1. Enviar requisição POST /auth/login
2. Informar username e password válidos

Dados:

```json
{
  "username": "admin",
  "password": "123"
}
```

Resultado esperado:

* Status 200
* Retorno de token JWT

---

## - Login com credenciais inválidas

Passos:

1. Enviar POST /auth/login
2. Informar dados incorretos

Dados:

```json
{
  "username": "wrong",
  "password": "wrong"
}
```

Resultado esperado:

* Status 401
* Mensagem "Login inválido"

---

# GROUPS - CRIAR

## CT03 - Criar grupo com dados válidos

Pré-condição: Token válido

Passos:

1. Enviar POST /api/groups
2. Incluir token no header
3. Enviar body válido

Dados:

```json
{
  "name": "NEW JEANS",
  "debutYear": 2022,
  "fandom": "Bunnies"
}
```

Resultado esperado:

* Status 201
* Grupo criado com ID

---

## CT04 - Criar grupo com campo faltando

Passos:

1. Enviar POST /api/groups
2. Remover campo fandom

Dados:

```json
{
  "name": "NEW JEANS",
  "debutYear": 2022
}
```

Resultado esperado:

* Status 400
* Mensagem de validação

---

## CT05 - Criar grupo sem body

Passos:

1. Enviar POST /api/groups sem JSON

Resultado esperado:

* Status 400
* Mensagem de erro

---

# GROUPS - CONSULTA

## CT06 - Listar grupos

Passos:

1. Enviar GET /api/groups
2. Token válido

Resultado esperado:

* Status 200
* Lista de grupos

---

## CT07 - Buscar grupo por ID válido

Passos:

1. Criar grupo
2. Usar ID retornado
3. GET /api/groups/{id}

Resultado esperado:

* Status 200
* Grupo retornado

---

## CT08 - Buscar grupo inexistente

Passos:

1. GET /api/groups/999

Resultado esperado:

* Status 404
* Mensagem "Grupo não encontrado"

---

# UPDATE

## CT09 - Atualizar grupo existente

Passos:

1. Criar grupo
2. Enviar PUT /api/groups/{id}
3. Alterar fandom

Dados:

```json
{
  "fandom": "Updated"
}
```

Resultado esperado:

* Status 200
* Dados atualizados

---

# DELETE

## CT10 - Deletar grupo existente

Passos:

1. Criar grupo
2. DELETE /api/groups/{id}

Resultado esperado:

* Status 200
* Mensagem de sucesso

---

## CT11 - Deletar grupo inexistente

Passos:

1. DELETE /api/groups/999

Resultado esperado:

* Status 404

---

# SEGURANÇA

## CT12 - Acesso sem token

Passos:

1. Enviar GET /api/groups sem Authorization

Resultado esperado:

* Status 401

---

## CT13 - Token inválido

Passos:

1. Enviar token inválido

Resultado esperado:

* Status 401

---

# SWAGGER

## CT14 - Acesso ao Swagger

Passos:

1. Abrir /api-docs

Resultado esperado:

* Interface carregada corretamente

---

## CT15 - Execução via Swagger

Passos:

1. Executar POST /api/groups via Swagger

Resultado esperado:

* Requisição executada com sucesso
