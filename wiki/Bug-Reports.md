# Bug Reports

## Referência
- ISO/IEC/IEEE 29119-3: Documentação de testes
- ISO/IEC/IEEE 29119-2: Processo de testes

## Objetivo
Documentar os defeitos encontrados durante o desenvolvimento e validação da API K-pop, seguindo o formato recomendado pela ISO 29119.

## Estrutura do Relatório de Bugs
- ID do bug
- Título / descrição
- Severidade
- Prioridade
- Status
- Componente afetado
- Data de detecção
- Relator
- Passos para reprodução
- Comportamento atual
- Comportamento esperado
- Causa raiz
- Ação corretiva
- Evidências de verificação

## Relatórios de Bugs

### BR-001: Cadastro de grupo duplicado
- Severidade: Alta
- Prioridade: Alta
- Status: Corrigido
- Componente: `src/services/groupService.js`
- Data: 2026-05-01
- Relator: Desenvolvimento

#### Passos para reprodução
1. Autenticar com token válido.
2. Enviar `POST /api/groups` com um grupo válido.
3. Enviar novamente `POST /api/groups` com o mesmo campo `name`.

#### Comportamento atual
- A API criava um segundo grupo com o mesmo nome.

#### Comportamento esperado
- A API retorna `400 Bad Request` com `ok: false` e mensagem de duplicação.

#### Causa raiz
- Ausência de verificação de nomes duplicados antes de inserir o grupo.

#### Ação corretiva
- Implementar validação de duplicidade no serviço de criação de grupos.
- Atualizar os testes automatizados para validar este cenário.

#### Evidência de verificação
- Caso de teste `não deve criar grupo com nome duplicado` em `test/integration/groups.test.js` passou com sucesso.

---

### BR-002: Consulta após exclusão retornando grupo existente
- Severidade: Média
- Prioridade: Alta
- Status: Corrigido
- Componente: `src/models/database.js`
- Data: 2026-05-01
- Relator: Desenvolvimento

#### Passos para reprodução
1. Resetar o banco de dados em memória.
2. Criar um grupo de teste.
3. Excluir o grupo criado.
4. Executar `GET /api/groups/{id}` com o mesmo ID.

#### Comportamento atual
- A requisição retornava `200 OK` em vez de `404 Not Found`.

#### Comportamento esperado
- A requisição deve retornar `404 Not Found` após a exclusão do grupo.

#### Causa raiz
- Função `resetDatabase()` reiniciava `currentId` para `1`, gerando conflito de IDs com os grupos iniciais e resultando em reutilização de ID.

#### Ação corretiva
- Ajustar a lógica de reset para continuar a numeração de IDs após os valores iniciais.
- Validar o comportamento de exclusão em ambiente de teste.

#### Evidência de verificação
- Teste `não deve encontrar grupo após deleção` passou com sucesso após a correção.

---

### BR-003: Inconsistência entre Swagger e resposta real do endpoint POST
- Severidade: Média
- Prioridade: Média
- Status: Corrigido
- Componente: `src/controllers/groupController.js` / `src/routes/groupRoutes.js`
- Data: 2026-05-01
- Relator: Desenvolvimento

#### Passos para reprodução
1. Consultar a documentação Swagger para o `POST /groups`.
2. Enviar `POST /api/groups` na API.
3. Comparar o formato de resposta real com o modelo Swagger.

#### Comportamento atual
- Swagger espera um objeto com `ok`, `message` e `data`, mas a API retornava apenas o recurso criado.

#### Comportamento esperado
- A API deve retornar um objeto compatível com o contrato documentado no Swagger.

#### Causa raiz
- Implementação do controller retornava diretamente o recurso em vez de usar o wrapper de resposta documentado.

#### Ação corretiva
- Ajustar o controller para retornar `ok`, `message` e `data` em todos os endpoints.
- Atualizar testes para validar o novo formato.

#### Evidência de verificação
- Todos os testes de integração passaram após a correção, incluindo validação de `response.body.ok` e `response.body.data`.

---

### BR-004: Coleção Postman incompleta no repositório
- Severidade: Baixa
- Prioridade: Média
- Status: Aberto
- Componente: Documentação
- Data: 2026-05-01
- Relator: Desenvolvimento

#### Descrição
- O arquivo `postman/kpop-tests.collection.json` não contém os requests esperados, apenas variáveis de ambiente.

#### Impacto
- A falta da coleção completa reduz a capacidade de execução de testes manuais e revisão de API por QA.

#### Ação recomendada
- Incluir a coleção completa de requests Postman no repositório ou fornecer instruções claras para importação.
- Verificar e alinhar as variáveis de ambiente com a documentação existente.

---

## Documentos Relacionados
- `README.md`
- `wiki/Casos-de-Teste.md`
- `wiki/Plano-de-Testes.md`
- `src/routes/groupRoutes.js`
- `test/integration/groups.test.js`
