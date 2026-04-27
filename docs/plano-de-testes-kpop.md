# PLANO DE TESTE – KPOP API

## 1. Informações Gerais

Projeto: Kpop API REST
Versão: v1.0.0
Tipo: API REST
Responsável: QA
Ambiente: Local (localhost:3000)
Ferramentas: Swagger UI, Postman, Curl, Node.js, GitHub

---

## 2. Objetivo do Teste

Validar o funcionamento da API REST de grupos de K-pop, garantindo:

* Autenticação JWT funcionando corretamente
* CRUD de grupos funcionando
* Validação de dados correta
* Respostas HTTP adequadas
* Documentação Swagger funcional
* Estabilidade da API

---

## 3. Escopo

### Incluído:

* Login de usuário (/auth/login)
* CRUD de grupos (/api/groups)
* Middleware de autenticação JWT
* Swagger UI
* Validação de payload

### Excluído:

* Banco de dados real (dados em memória)
* Frontend
* Deploy em nuvem

---

## 4. Funcionalidades a serem testadas

### Autenticação

* Login válido
* Login inválido
* Geração de token JWT
* Uso do token em rotas protegidas

### CRUD de Groups

* Criar grupo
* Listar grupos
* Buscar grupo por ID
* Atualizar grupo
* Deletar grupo

### Swagger

* Acesso ao Swagger UI
* Documentação dos endpoints
* Execução via Swagger

### Validação

* Campos obrigatórios (name, debutYear, fandom)
* Body vazio
* Tipos inválidos

---

## 5. Tipos de Teste

### Testes Funcionais

Verificar se cada endpoint funciona corretamente

### Testes Negativos

* Dados inválidos
* Token inválido
* Body vazio

### Testes de Integração

* Login → token → acesso a CRUD

### Testes de Segurança (básico)

* Acesso sem token
* Token inválido

### Testes Exploratórios

* Entradas inesperadas
* Payloads quebrados
* Rotas inexistentes

### Testes de API (manual)

* Swagger
* Postman
* Curl

---

## 6. Cenários de Teste

### Login

CT01: Login válido retorna token
CT02: Login inválido retorna 401

### Groups

CT03: Criar grupo com dados válidos
CT04: Criar grupo sem campos obrigatórios
CT05: Listar grupos com token válido
CT06: Buscar grupo por ID válido
CT07: Buscar grupo inexistente (404)
CT08: Atualizar grupo válido
CT09: Deletar grupo válido

### Segurança

CT10: Acesso sem token retorna 401
CT11: Token inválido retorna 401

### Swagger

CT12: Swagger abre corretamente
CT13: Executar requisição via Swagger funciona

---

## 7. Critérios de Aceitação

A API será considerada aprovada se:

* Todos endpoints retornarem status correto
* CRUD funcionar sem erro
* JWT proteger rotas corretamente
* Swagger funcionar sem falhas
* Validações impedirem dados inválidos

---

## 8. Critérios de Falha

Será considerado bug se:

* Rota não existir
* Retorno 500 inesperado
* Autenticação falhar indevidamente
* Dados inválidos forem aceitos
* Swagger não executar endpoints

---

## 9. Estratégia de Execução

1. Login
2. Capturar token
3. Criar grupo
4. Listar grupos
5. Buscar por ID
6. Atualizar
7. Deletar
8. Testes negativos
9. Swagger validation
10. Exploratório

---

## 10. Observações

* API não usa banco real (dados em memória)
* Reiniciar servidor limpa dados
* Swagger é ferramenta principal de validação
* JWT é obrigatório para CRUD
