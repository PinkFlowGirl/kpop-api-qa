# K-pop API QA

API REST para gerenciamento de grupos de K-pop, com autenticação JWT, testes automatizados e documentação completa de QA.

Este projeto demonstra práticas de qualidade de software, incluindo testes de integração, testes de performance e documentação estruturada seguindo a ISO 29119.

---

## Tecnologias

- Node.js + Express
- Banco de dados em memória (in-memory)
- JWT (autenticação)
- Swagger (documentação da API)
- Mocha + Chai + Supertest (testes de integração)
- k6 (testes de performance)
- GitHub Actions (CI pipeline)
---

## Como rodar o projeto

```bash
git clone https://github.com/PinkFlowGirl/kpop-api-qa.git
cd kpop-api-qa
npm install
cp .env.example .env
# configure as variáveis de ambiente no arquivo .env
npm start
```

---

## Executar testes

Testes de integração:
```bash
npm test
```

Testes de performance (k6):
```bash
k6 run performance/load-test.js
```

---

## Funcionalidades

- Autenticação de usuários com JWT
- Cadastro de grupos de K-pop
- Listagem de grupos
- Atualização de dados
- Exclusão de grupos

---

## Documentação completa

A documentação completa está disponível na Wiki do repositório, incluindo:

- User Stories
- Regras de Negócio
- Plano de Testes (ISO 29119)
- Casos de Teste (ISO 29119)
- Testes Automatizados
- Testes Exploratórios (Charters)
- Evidências
- Relatório de Bugs (ISO 29119)

**[Acessar Wiki](https://github.com/PinkFlowGirl/kpop-api-qa/wiki)**

---

## Diferenciais

- Documentação completa de QA baseada na ISO 29119
- Testes automatizados com Mocha, Chai e Supertest
- Testes de performance com k6
- CI pipeline com GitHub Actions
- Testes exploratórios documentados com charters

---

## Autora

Desenvolvido por **Claudia de Oliveira Mangueira**
