## Charter 1 — Autenticação (JWT)

**Charter:** Explorar o endpoint POST /auth/login para descobrir falhas na geração e validação do token JWT

**Área:** Autenticação — login, token, sessão

**Tempo:** 30–45 min

**Risco:** Alto

**Ideias de teste:**
- Login com credenciais corretas → token é retornado?
- Login com senha errada → status 401 correto?
- Token expirado → acesso negado com 401?
- Token manipulado manualmente → API rejeita?
- Request sem header Authorization → 403 ou 401?
- Dois logins simultâneos com o mesmo usuário → comportamento?

**Notas:** Registrar status codes retornados, mensagens de erro e tempo de expiração do token

## Charter 2 — Criação e listagem de grupos

**Charter:** Explorar os endpoints POST e GET /groups para descobrir problemas de validação de dados e consistência

**Área:** Cadastro de grupos — criação, listagem, campos obrigatórios

**Tempo:** 30–45 min

**Risco:** Alto

**Ideias de teste:**
- Criar grupo com todos os campos válidos → 201 e dados corretos?
- Criar grupo sem nome → API retorna 400 com mensagem clara?
- Criar grupo com nome duplicado → erro ou aceita duplicata?
- Criar grupo com campos extras não esperados → silenciado ou erro?
- Listar grupos sem autenticação → 401 ou dados expostos?
- Listar quando não há grupos cadastrados → array vazio ou erro?
- Nome com caracteres especiais (한국어, emoji) → aceito ou rejeitado?

**Notas:** Verificar se o contrato Swagger está de acordo com as respostas reais da API

## Charter 3 — Atualização e deleção de grupos

**Charter:** Explorar os endpoints PUT e DELETE /groups/:id para descobrir falhas de permissão e integridade dos dados

**Área:** Edição e remoção de grupos

**Tempo:** 30 min

**Risco:** Médio

**Ideias de teste:**
- Atualizar grupo existente com dados válidos → 200 e dados atualizados?
- Atualizar grupo com ID inexistente → 404 com mensagem clara?
- Atualizar apenas um campo parcial (PATCH vs PUT) → comportamento?
- Deletar grupo existente → 200 ou 204?
- Deletar grupo já deletado → 404 ou erro diferente?
- Deletar com ID inválido (texto em vez de ID) → 400 ou 500?
- Operações sem token → devidamente bloqueadas?

**Notas:** Atenção ao retorno após deleção e se o grupo some da listagem imediatamente

## Charter 4 — Segurança e autorização

**Charter:** Explorar a camada de autenticação JWT para descobrir brechas de acesso indevido a recursos protegidos

**Área:** Segurança — autorização, headers, exposição de dados

**Tempo:** 45 min

**Risco:** Alto

**Ideias de teste:**
- Acessar todos os endpoints sem token → todos bloqueados?
- Usar token com assinatura inválida → 401 ou 500?
- Enviar token no body em vez do header → aceito ou ignorado?
- Mensagens de erro expõem detalhes internos (stack trace)?
- Headers de segurança presentes (CORS, X-Content-Type)?
- IDs sequenciais → possível enumeração de recursos?

**Notas:** Registrar qualquer informação sensível exposta nas respostas de erro

## Charter 5 — Casos extremos e validação de entrada

**Charter:** Explorar os endpoints da API com entradas inesperadas para descobrir falhas de robustez e tratamento de erros

**Área:** Validação de entrada — tipos, limites, valores nulos

**Tempo:** 30 min

**Risco:** Médio

**Ideias de teste:**
- Enviar body completamente vazio → 400 com mensagem útil?
- Enviar JSON malformado → 400 ou 500?
- Campos numéricos com texto (ex: ano: "abc") → validado?
- Nome de grupo com 1 caractere e com 10.000 caracteres → limites?
- Array onde espera string → erro ou cast silencioso?
- ID com formato inválido (UUID vs número) → consistente?
- Request com Content-Type errado (text/plain) → tratado?

**Notas:** Verificar se erros 500 aparecem — qualquer 500 inesperado é candidato a bug report