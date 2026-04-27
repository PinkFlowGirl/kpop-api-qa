# Kpop API

API REST desenvolvida em Node.js para gerenciamento de grupos de K-pop,
com autenticação via JWT e documentação com Swagger.

## Tecnologias utilizadas

-   Node.js
-   Express
-   JWT (JSON Web Token)
-   Swagger (swagger-jsdoc + swagger-ui-express)

## Estrutura do projeto

    src/
     ├── controllers/
     ├── services/
     ├── routes/
     ├── middlewares/
     ├── models/
     └── docs/
    app.js

## Como rodar o projeto

1.  Instale as dependências:

```{=html}
<!-- -->
```
    npm install

2.  Inicie o servidor:

```{=html}
<!-- -->
```
    npm start

3.  O servidor estará rodando em:

```{=html}
<!-- -->
```
    http://localhost:3000

## Documentação Swagger

Acesse a documentação interativa da API:

    http://localhost:3000/api-docs

## Autenticação

A API utiliza autenticação via JWT.

### Login

Endpoint:

    POST /login

Body:

``` json
{
  "username": "admin",
  "password": "123"
}
```

Resposta:

``` json
{
  "ok": true,
  "token": "SEU_TOKEN_AQUI"
}
```

### Como usar o token

Nas requisições protegidas, adicione no header:

    Authorization: Bearer SEU_TOKEN_AQUI

## Endpoints disponíveis

Criar grupo:

    POST /api/groups

Listar grupos:

    GET /api/groups

Buscar grupo por ID:

    GET /api/groups/{id}

Atualizar grupo:

    PUT /api/groups/{id}

Deletar grupo:

    DELETE /api/groups/{id}

## Exemplo de Body (POST/PUT)

``` json
{
  "name": "NEW JEANS",
  "fandom": "Bunnies",
  "debutYear": 2022
}
```

## Objetivo do projeto

Este projeto foi desenvolvido com o objetivo de praticar:

-   Criação de API REST
-   Organização em camadas (routes, controllers, services)
-   Autenticação com JWT
-   Documentação com Swagger
-   Boas práticas de desenvolvimento backend

## Autora

Claudia de Oliveira Mangueira

## Observações

-   Os dados são armazenados em memória (sem banco de dados)
-   Projeto voltado para fins de estudo e portfólio
