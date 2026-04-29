# Test Cases – Kpop API

## Status
✅ **Todos os 6 testes passando automaticamente**

---

## Autenticação

### CT01 - Login com credenciais válidas
- **Rota:** POST `/api/auth/login`
- **Entrada:** `{ "username": "admin", "password": "123" }`
- **Esperado:** 200 OK + token JWT
- **Status:** ✅ PASS

### CT02 - Login com credenciais inválidas
- **Rota:** POST `/api/auth/login`
- **Entrada:** `{ "username": "admin", "password": "wrong" }`
- **Esperado:** 401 Unauthorized
- **Status:** ✅ PASS

### CT03 - Acesso sem token
- **Rota:** GET `/api/groups`
- **Header:** Sem Authorization
- **Esperado:** 401 Unauthorized + "Token não informado"
- **Status:** ✅ PASS

### CT04 - Acesso com token inválido
- **Rota:** GET `/api/groups`
- **Header:** `Authorization: Bearer FAKE_TOKEN`
- **Esperado:** 401 Unauthorized + "Token inválido"
- **Status:** ✅ PASS

---

## CRUD - Grupos

### CT05 - Criar grupo válido
- **Rota:** POST `/api/groups`
- **Header:** `Authorization: Bearer {token}`
- **Entrada:** `{ "name": "IVE", "debutYear": 2021, "fandom": "DIVE" }`
- **Esperado:** 201 Created + objeto do grupo com ID
- **Status:** ✅ PASS

### CT06 - Listar todos os grupos
- **Rota:** GET `/api/groups`
- **Header:** `Authorization: Bearer {token}`
- **Esperado:** 200 OK + array de grupos
- **Status:** ✅ PASS

### CT07 - Buscar grupo por ID válido
- **Rota:** GET `/api/groups/:id`
- **Header:** `Authorization: Bearer {token}`
- **Esperado:** 200 OK + objeto do grupo
- **Status:** ✅ PASS

### CT08 - Buscar grupo inexistente
- **Rota:** GET `/api/groups/999`
- **Header:** `Authorization: Bearer {token}`
- **Esperado:** 404 Not Found
- **Status:** ✅ PASS

### CT09 - Atualizar grupo
- **Rota:** PUT `/api/groups/:id`
- **Header:** `Authorization: Bearer {token}`
- **Entrada:** `{ "fandom": "DIVE UPDATED" }`
- **Esperado:** 200 OK + grupo atualizado
- **Status:** ✅ PASS

### CT10 - Deletar grupo
- **Rota:** DELETE `/api/groups/:id`
- **Header:** `Authorization: Bearer {token}`
- **Esperado:** 200 OK
- **Status:** ✅ PASS

### CT11 - Criar grupo sem nome (validação)
- **Rota:** POST `/api/groups`
- **Entrada:** `{ "debutYear": 2021, "fandom": "DIVE" }`
- **Esperado:** 400 Bad Request
- **Status:** ⏳ Não testado

### CT12 - Criar grupo com ano inválido
- **Rota:** POST `/api/groups`
- **Entrada:** `{ "name": "IVE", "debutYear": "invalid", "fandom": "DIVE" }`
- **Esperado:** 400 Bad Request
- **Status:** ⏳ Não testado

---

## Resumo de Cobertura

| Categoria | Total | Passando | Taxa |
|-----------|-------|----------|------|
| Autenticação | 4 | 4 | 100% |
| CRUD | 6 | 6 | 100% |
| Validação | 2 | 0 | 0% |
| **Total** | **12** | **10** | **83%** |

---

## Ferramentas Utilizadas

- **Framework:** Mocha + Chai + Supertest
- **Comando:** `npm test`
- **Tempo de Execução:** ~92ms