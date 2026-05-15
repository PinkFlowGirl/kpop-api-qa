# Casos de Teste

## Referência
- ISO/IEC/IEEE 29119-1: Conceitos e definições
- ISO/IEC/IEEE 29119-2: Processo de testes
- ISO/IEC/IEEE 29119-3: Documentação de testes

## Objetivo
Este documento define os casos de teste para a API K-pop, garantindo cobertura funcional e aderência ao padrão ISO/IEC/IEEE 29119.

## Escopo
Testar os casos principais de API para gerenciamento de grupos de K-pop:
- Autenticação
- Criação de grupo
- Listagem de grupos
- Consulta de grupo por ID
- Atualização de grupo
- Exclusão de grupo

## Itens de Teste
- Endpoint `POST /api/auth/login`
- Endpoint `POST /api/groups`
- Endpoint `GET /api/groups`
- Endpoint `GET /api/groups/{id}`
- Endpoint `PUT /api/groups/{id}`
- Endpoint `DELETE /api/groups/{id}`

## Critérios de Aceitação
- Resposta com status correto conforme especificação
- Formato de resposta consistente com o contrato Swagger
- Validação dos dados de entrada
- Tratamento de erros para dados inválidos ou acesso não autorizado
- Prevenção de duplicação de grupo por nome

## Estratégia de Teste
- Teste funcional de API via requests HTTP
- Testes automatizados com Mocha/Chai/Supertest
- Cobertura de cenários positivos e negativos

## Casos de Teste

| ID | Caso de Teste | Pré-condição | Passos | Resultado Esperado |
| --- | --- | --- | --- | --- |
| TST-API-01 | Autenticar usuário | API em execução | 1. POST /api/auth/login com usuário/senha válidos | 200, token JWT válido |
| TST-API-02 | Criar grupo válido | Usuário autenticado | 1. POST /api/groups com body válido | 201, `ok: true`, `message: "Grupo criado com sucesso"`, `data` com campos do grupo |
| TST-API-03 | Evitar duplicação de nome | Usuário autenticado; grupo com mesmo nome existente | 1. POST /api/groups com nome duplicado | 400, `ok: false`, mensagem de duplicação |
| TST-API-04 | Validar payload inválido | Usuário autenticado | 1. POST /api/groups com dados inválidos | 400, `ok: false`, mensagem de erro de validação |
| TST-API-05 | Listar grupos autenticado | Usuário autenticado | 1. GET /api/groups | 200, `ok: true`, `data` é lista de grupos |
| TST-API-06 | Bloquear listagem sem token | Sem token | 1. GET /api/groups sem header Authorization | 401, `ok: false`, mensagem de token não informado |
| TST-API-06B | Bloquear listagem com token inválido | Token inválido | 1. GET /api/groups com token inválido | 401, ok: false, message: "Token inválido" | 
| TST-API-07 | Consultar grupo por ID válido | Usuário autenticado; grupo existente | 1. GET /api/groups/{id} | 200, `ok: true`, `data` com grupo correto |
| TST-API-08 | Consultar grupo por ID inexistente | Usuário autenticado | 1. GET /api/groups/{id}` inexistente | 404, `ok: false`, `message: "Grupo não encontrado"` |
| TST-API-09 | Atualizar grupo existente | Usuário autenticado; grupo existente | 1. PUT /api/groups/{id} com dados válidos | 200, `ok: true`, `message: "Grupo atualizado com sucesso"`, `data` atualizado |
| TST-API-10 | Excluir grupo existente | Usuário autenticado; grupo existente | 1. DELETE /api/groups/{id} | 200, `ok: true`, `message: "Grupo removido com sucesso"`, `data` removido |
| TST-API-11 | Verificar grupo removido | Usuário autenticado; grupo excluído | 1. GET /api/groups/{id} | 404, `ok: false`, `message: "Grupo não encontrado"` |
| TST-API-12 |	Login com credenciais erradas |	API em execução	| 1. POST /api/auth/login com senha incorreta |	401, ok: false |
|TST-API-13  |	Login com body vazio |	API em execução | 1. POST /api/auth/login com body vazio {} | 400, ok: false |
|TST-API-14  |	Consultar grupo por ID inválido (texto) | Usuário autenticado |	1. GET /api/groups/abc| 404, ok: false — Bug BR-006: deveria retornar 400
|TST-API-15  |	Atualizar grupo com ID inexistente | Usuário autenticado | 1. PUT /api/groups/999 com dados válidos | 404, ok: false
|TST-API-16  |	Deletar grupo com ID inexistente | Usuário autenticado | 1. DELETE /api/groups/999 | 404, ok: false
|TST-API-17  |	Criar grupo com debutYear como texto |	Usuário autenticado | 1. POST /api/groups com debutYear: "dois mil" |	400, ok: false
|TST-API-18  |	Criar grupo com generation negativo | Usuário autenticado | 1. POST /api/groups com generation: -1 | 201 — Bug BR-007: deveria retornar 400
|TST-API-19  |	Criar grupo com name muito longo | Usuário autenticado | 1. POST /api/groups com name de 500 caracteres|	201 — Bug BR-008: deveria retornar 400
## Observações
- A coleta de dados de teste deve ser registrada em ambiente controlado.
- A prova do resultado deve incluir request/response e log de execução.
- A automação já contempla os casos principais em `test/integration/groups.test.js`.

## Documentos Relacionados
- `README.md`
- `src/routes/groupRoutes.js` (Swagger)
- `test/integration/groups.test.js`
