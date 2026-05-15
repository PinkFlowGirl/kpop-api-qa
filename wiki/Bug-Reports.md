# Bug Reports

## Referência
ISO/IEC/IEEE 29119-3: Documentação de testes
ISO/IEC/IEEE 29119-2: Processo de testes

## Objetivo
Documentar os defeitos encontrados durante o desenvolvimento e validação da API K-pop, seguindo o formato recomendado pela ISO 29119.

---

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

---

## Relatórios de Bugs

### BR-001: Cadastro de grupo duplicado
**Severidade:** Alta
**Prioridade:** Alta
**Status:** Corrigido
**Componente:** src/services/groupService.js
**Data:** 2026-05-01
**Relator:** Desenvolvimento

**Passos para reprodução**
1. Autenticar com token válido.
2. Enviar POST /api/groups com um grupo válido.
3. Enviar novamente POST /api/groups com o mesmo campo name.

**Comportamento atual**
A API criava um segundo grupo com o mesmo nome.

**Comportamento esperado**
A API retorna 400 Bad Request com ok: false e mensagem de duplicação.

**Causa raiz**
Ausência de verificação de nomes duplicados antes de inserir o grupo.

**Ação corretiva**
- Implementar validação de duplicidade no serviço de criação de grupos.
- Atualizar os testes automatizados para validar este cenário.

**Evidência de verificação**
Caso de teste `não deve criar grupo com nome duplicado` em test/integration/groups.test.js passou com sucesso.

---

### BR-002: Consulta após exclusão retornando grupo existente
**Severidade:** Média
**Prioridade:** Alta
**Status:** Corrigido
**Componente:** src/models/database.js
**Data:** 2026-05-01
**Relator:** Desenvolvimento

**Passos para reprodução**
1. Resetar o banco de dados em memória.
2. Criar um grupo de teste.
3. Excluir o grupo criado.
4. Executar GET /api/groups/{id} com o mesmo ID.

**Comportamento atual**
A requisição retornava 200 OK em vez de 404 Not Found.

**Comportamento esperado**
A requisição deve retornar 404 Not Found após a exclusão do grupo.

**Causa raiz**
Função resetDatabase() reiniciava currentId para 1, gerando conflito de IDs com os grupos iniciais e resultando em reutilização de ID.

**Ação corretiva**
- Ajustar a lógica de reset para continuar a numeração de IDs após os valores iniciais.
- Validar o comportamento de exclusão em ambiente de teste.

**Evidência de verificação**
Teste `não deve encontrar grupo após deleção` passou com sucesso após a correção.

---

### BR-003: Inconsistência entre Swagger e resposta real do endpoint POST
**Severidade:** Média
**Prioridade:** Média
**Status:** Corrigido
**Componente:** src/controllers/groupController.js / src/routes/groupRoutes.js
**Data:** 2026-05-01
**Relator:** Desenvolvimento

**Passos para reprodução**
1. Consultar a documentação Swagger para o POST /groups.
2. Enviar POST /api/groups na API.
3. Comparar o formato de resposta real com o modelo Swagger.

**Comportamento atual**
Swagger espera um objeto com ok, message e data, mas a API retornava apenas o recurso criado.

**Comportamento esperado**
A API deve retornar um objeto compatível com o contrato documentado no Swagger.

**Causa raiz**
Implementação do controller retornava diretamente o recurso em vez de usar o wrapper de resposta documentado.

**Ação corretiva**
- Ajustar o controller para retornar ok, message e data em todos os endpoints.
- Atualizar testes para validar o novo formato.

**Evidência de verificação**
Coleção completa adicionada em test/postman/K-pop API QA.postman_collection.json — commit a2cd83d em 2026-05-02.

---

### BR-004: Coleção Postman incompleta no repositório
**Severidade:** Baixa
**Prioridade:** Média
**Status:** Corrigido
**Componente:** Documentação
**Data:** 2026-05-01
**Relator:** Desenvolvimento

**Descrição**
O arquivo postman/kpop-tests.collection.json não contém os requests esperados, apenas variáveis de ambiente.

**Impacto**
A falta da coleção completa reduz a capacidade de execução de testes manuais e revisão de API por QA.

**Ação recomendada**
- Incluir a coleção completa de requests Postman no repositório ou fornecer instruções claras para importação.
- Verificar e alinhar as variáveis de ambiente com a documentação existente.

---

### BR-005: Mensagem de erro incorreta no login com credenciais inválidas
**Severidade:** Média
**Prioridade:** Média
**Status:** Aberto
**Componente:** src/controllers/authController.js
**Data:** 2026-05-02
**Relator:** QA — Teste exploratório

**Passos para reprodução**
1. Enviar POST /api/auth/login com username válido e password incorreto.

**Comportamento atual**
A API retorna `{"ok": false, "message": "Token inválido"}`.

**Comportamento esperado**
A API deve retornar status 401 com mensagem `"Credenciais inválidas"` ou `"Usuário ou senha incorretos"`, já que o erro é de autenticação e não de token.

**Causa raiz**
A mensagem de erro do middleware de token está sendo reutilizada indevidamente no fluxo de login.

**Ação corretiva**
- Criar mensagem de erro específica para falha de login no authController.
- Garantir que o status HTTP retornado seja 401.

**Evidência de verificação**
Teste manual via curl — resultado registrado durante sessão de testes exploratórios em 2026-05-02.

---

### BR-006: ID inválido retorna mensagem de recurso não encontrado em vez de erro de validação
**Severidade:** Baixa
**Prioridade:** Baixa
**Status:** Aberto
**Componente:** src/controllers/groupController.js
**Data:** 2026-05-02
**Relator:** QA — Teste exploratório

**Passos para reprodução**
1. Autenticar com token válido.
2. Enviar GET /api/groups/abc (ID com formato inválido).

**Comportamento atual**
A API retorna `{"ok": false, "message": "Grupo não encontrado"}`.

**Comportamento esperado**
A API deve retornar status 400 Bad Request com mensagem `"ID inválido"`, já que o problema é o formato do ID e não a ausência do recurso.

**Causa raiz**
Ausência de validação do formato do ID antes de realizar a busca no banco de dados.

**Ação corretiva**
- Adicionar validação de formato do ID no controller ou middleware de rotas.
- Retornar 400 com mensagem descritiva quando o ID não for numérico.

**Evidência de verificação**
Teste manual via curl — resultado registrado durante sessão de testes exploratórios em 2026-05-02.

---
### BR-007: API aceita generation com valor negativo
**Severidade:** Média
**Prioridade:** Baixa
**Status:** Aberto
**Componente:** src/controllers/groupController.js
**Data:** 2026-05-02
**Relator:** QA — Teste automatizado

**Passos para reprodução**
1. Autenticar com token válido.
2. Enviar POST /api/groups com generation: -1.

**Comportamento atual**
A API aceita o valor e retorna 201 Created.

**Comportamento esperado**
A API deve retornar 400 Bad Request, pois generation deve ser um número positivo.

**Causa raiz**
Ausência de validação do valor mínimo do campo generation no controller ou serviço.

**Ação corretiva**
- Adicionar validação para rejeitar values negativos ou zero no campo generation.
- Atualizar testes para validar o comportamento correto após a correção.

**Evidência de verificação**
Teste automatizado `não deve criar grupo com generation negativo` em test/integration/groups.test.js — comportamento documentado como bug em 2026-05-02.

---

### BR-008: API aceita name com quantidade excessiva de caracteres
**Severidade:** Baixa
**Prioridade:** Baixa
**Status:** Aberto
**Componente:** src/controllers/groupController.js
**Data:** 2026-05-02
**Relator:** QA — Teste automatizado

**Passos para reprodução**
1. Autenticar com token válido.
2. Enviar POST /api/groups com name contendo 500 caracteres.

**Comportamento atual**
A API aceita o valor e retorna 201 Created.

**Comportamento esperado**
A API deve retornar 400 Bad Request, pois o campo name deve ter um limite máximo de caracteres.

**Causa raiz**
Ausência de validação de tamanho máximo do campo name no controller ou serviço.

**Ação corretiva**
- Definir e documentar o limite máximo de caracteres para o campo name.
- Adicionar validação para rejeitar valores acima do limite definido.
- Atualizar testes para validar o comportamento correto após a correção.

**Evidência de verificação**
Teste automatizado `não deve criar grupo com name muito longo` em test/integration/groups.test.js — comportamento documentado como bug em 2026-05-02.

### BR-009: Swagger em branco em ambiente de produção (Vercel)

Severidade: Alta | Prioridade: Alta | Status: Corrigido
Componente: app.js / src/config/swagger.js
Data: 2026-05-13
Passos: Acessar https://kpop-api-qa.vercel.app/api-docs
Comportamento atual: Página em branco, sem renderização do Swagger
Comportamento esperado: Interface Swagger carregada corretamente
Causa raiz: Arquivos estáticos do swagger-ui-express não servidos corretamente pela Vercel
Ação corretiva: Substituição por arquivos via CDN do cdnjs.cloudflare.com

### BR-010: URL do servidor Swagger apontando para URL de preview

Severidade: Média | Prioridade: Alta | Status: Corrigido
Componente: src/config/swagger.js
Data: 2026-05-13
Comportamento atual: Swagger usava VERCEL_URL que retorna URL de preview (kpop-api-9ba5gxf54-...vercel.app)
Comportamento esperado: Swagger deve usar a URL principal de produção
Causa raiz: process.env.VERCEL_URL retorna URL dinâmica de preview em vez da URL fixa
Ação corretiva: Substituição por URL fixa https://kpop-api-qa.vercel.app/api

### BR-011: Timeout na conexão com MongoDB Atlas em ambiente serverless

Severidade: Alta | Prioridade: Alta | Status: Corrigido
Componente: app.js
Data: 2026-05-14
Comportamento atual: Operation groups.find() buffering timed out after 10000ms
Comportamento esperado: API retorna dados normalmente
Causa raiz: Funções serverless da Vercel não mantêm conexão persistente entre requisições
Ação corretiva: Adicionado middleware que garante conexão MongoDB antes de cada requisição usando mongoose.connection.readyState


## Documentos Relacionados
- README.md
- wiki/Casos-de-Teste.md
- wiki/Plano-de-Testes.md
- src/routes/groupRoutes.js
- test/integration/groups.test.js