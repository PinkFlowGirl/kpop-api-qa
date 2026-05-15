# K-pop API QA

Bem-vinda à documentação completa de qualidade da **K-pop API** — uma API REST para gerenciamento de grupos de K-pop, desenvolvida com foco em boas práticas de QA.

---

## Sobre o projeto
API REST construída em Node.js com autenticação JWT, documentação Swagger e cobertura completa de testes automatizados, de performance e exploratórios.

---

## Documentação

| # | Página | Descrição |
|---|---|---|
| 1 | [Home](1-Home) | Página inicial |
| 2 | [User Stories](2-User-Stories) | Histórias de usuário por épico |
| 3 | [Regras de Negócio](3-Regras-de-Negócio) | Regras e restrições da API |
| 4 | [Plano de Testes](4-Plano-de-Testes) | Estratégia e escopo dos testes |
| 5 | [Casos de Teste](5-Casos-de-Teste) | 19 casos de teste documentados |
| 6 | [Testes Automatizados](6-Testes-Automatizados) | Cobertura e execução dos testes |
| 7 | [Evidências](7-Evidências) | Prints e resultados dos testes |
| 8 | [Relatório de Bugs](8-Relatório-de-Bugs) | 8 bugs documentados no padrão ISO 29119 |
| 9 | [Testes Exploratórios](9-Testes-Exploratórios-(Charters)) | 5 charters de teste exploratório |

---

## Tecnologias
- **API:** Node.js + Express + JWT
- **Testes de integração:** Mocha + Chai + Supertest
- **Testes de performance:** k6
- **Testes manuais:** Postman
- **Relatório:** Mochawesome
- **CI/CD:** GitHub Actions

---

## Resultados
- ✅ 20 testes automatizados passando
- ✅ Performance p95 = 12.85ms (limite 500ms)
- ✅ 4 bugs corrigidos
- 🔴 4 bugs abertos documentados
- ✅ CI pipeline rodando a cada commit

---

## Autora
Desenvolvido por **Claudia de Oliveira Mangueira**