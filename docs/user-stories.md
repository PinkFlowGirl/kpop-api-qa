# User Stories – Kpop API

## Status: ✅ Todas implementadas e testadas

---

## US01 - Autenticação do Usuário

**Como** um usuário  
**Quero** fazer login na API  
**Para** acessar os recursos protegidos

### Critérios de Aceite
- Endpoint: POST `/api/auth/login`
- Aceitar username e password
- Retornar JWT válido com 1 hora de expiração
- Rejeitar credenciais inválidas com 401
- Token deve ser obrigatório em rotas protegidas

### Testes Automatizados
✅ CT01 - Login com credenciais válidas
✅ CT02 - Login com credenciais inválidas
✅ CT03 - Acesso sem token
✅ CT04 - Acesso com token inválido

---

## US02 - Criar Grupo de K-pop

**Como** um usuário autenticado  
**Quero** cadastrar um novo grupo de K-pop  
**Para** manter um registro atualizado

### Critérios de Aceite
- Endpoint: POST `/api/groups`
- Requer autenticação JWT
- Campos obrigatórios: name, debutYear, fandom
- Retornar 201 Created com o grupo criado
- Retornar 400 Bad Request se dados inválidos

### Teste Automatizado
✅ CT05 - Criar grupo válido

---

## US03 - Listar Grupos

**Como** um usuário autenticado  
**Quero** visualizar todos os grupos de K-pop  
**Para** consultar informações disponíveis

### Critérios de Aceite
- Endpoint: GET `/api/groups`
- Requer autenticação JWT
- Retornar array de grupos
- Retornar 200 OK

### Teste Automatizado
✅ CT06 - Listar todos os grupos

---

## US04 - Buscar Grupo por ID

**Como** um usuário autenticado  
**Quero** buscar um grupo específico pelo ID  
**Para** obter detalhes de um grupo

### Critérios de Aceite
- Endpoint: GET `/api/groups/:id`
- Requer autenticação JWT
- Retornar o grupo se existir (200 OK)
- Retornar 404 Not Found se não existir

### Testes Automatizados
✅ CT07 - Buscar grupo por ID válido
✅ CT08 - Buscar grupo inexistente

---

## US05 - Atualizar Grupo

**Como** um usuário autenticado  
**Quero** editar as informações de um grupo  
**Para** manter os dados atualizados

### Critérios de Aceite
- Endpoint: PUT `/api/groups/:id`
- Requer autenticação JWT
- Permitir atualizar parcial (apenas campos enviados)
- Retornar 200 OK com grupo atualizado
- Retornar 404 Not Found se grupo não existir

### Teste Automatizado
✅ CT09 - Atualizar grupo

---

## US06 - Deletar Grupo

**Como** um usuário autenticado  
**Quero** remover um grupo da base de dados  
**Para** manter apenas grupos relevantes

### Critérios de Aceite
- Endpoint: DELETE `/api/groups/:id`
- Requer autenticação JWT
- Retornar 200 OK se deletado com sucesso
- Retornar 404 Not Found se grupo não existir

### Teste Automatizado
✅ CT10 - Deletar grupo

---

## Resumo de Implementação

| US | Titulo | Status | Testes |
|----|--------|--------|--------|
| US01 | Autenticação | ✅ Completa | 4/4 |
| US02 | Criar Grupo | ✅ Completa | 1/1 |
| US03 | Listar Grupos | ✅ Completa | 1/1 |
| US04 | Buscar Grupo | ✅ Completa | 2/2 |
| US05 | Atualizar Grupo | ✅ Completa | 1/1 |
| US06 | Deletar Grupo | ✅ Completa | 1/1 |
| **Total** | | **✅ 6/6** | **10/10** |