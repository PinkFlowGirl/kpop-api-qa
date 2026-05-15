# User Stories

## Visão Geral

As User Stories descrevem as funcionalidades da API sob a perspectiva do usuário, seguindo o padrão:

> Como [tipo de usuário]  
> Quero [ação]  
> Para [benefício]  

As histórias estão organizadas por épicos.

---

# Épico 1 – Autenticação

---

### US01 – Login com sucesso
**Como** usuário  
**Quero** fazer login  
**Para** acessar funcionalidades protegidas  

---

### US02 – Login inválido
**Como** usuário  
**Quero** receber erro ao inserir credenciais inválidas  
**Para** saber que os dados estão incorretos  

---

### US03 – Acesso com token
**Como** usuário autenticado  
**Quero** acessar rotas protegidas  
**Para** realizar operações no sistema  

---

### US04 – Criar grupo
Como usuário autenticado
Quero cadastrar um grupo de K-pop
Para armazenar suas informações

---

### US05 – Listar grupos
Como usuário autenticado
Quero visualizar todos os grupos cadastrados
Para consultar informações

---

# Épico 2 – Gestão de Grupos

---

### – Criar grupo
**Como** usuário autenticado  
**Quero** cadastrar um grupo de K-pop  
**Para** armazenar suas informações  

---

### US05 – Listar grupos
**Como** usuário  
**Quero** visualizar todos os grupos cadastrados  
**Para** consultar informações  

---

### US06 – Atualizar grupo
**Como** usuário autenticado  
**Quero** editar um grupo  
**Para** atualizar seus dados  

---

### US07 – Deletar grupo
**Como** usuário autenticado  
**Quero** remover um grupo  
**Para** manter a base de dados organizada  

---

# 🔗 Rastreabilidade (Traceability)

| User Story | Funcionalidade | Tipo |
|----------|----------------|------|
| US01 | Login | Autenticação |
| US02 | Login inválido | Autenticação |
| US03 | Acesso com token | Segurança |
| US04 | Criar grupo | CRUD |
| US05 | Listar grupos | CRUD |
| US06 | Atualizar grupo | CRUD |
| US07 | Deletar grupo | CRUD |

---

# Observações

- Todas as User Stories estão vinculadas às regras de negócio definidas na próxima seção  
- Cada User Story possui cenários e casos de teste associados  
- As funcionalidades protegidas exigem autenticação via token  

---