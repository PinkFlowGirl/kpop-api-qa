# Regras de Negócio

## Visão Geral

As regras de negócio definem as condições que a API deve respeitar para garantir o funcionamento correto das funcionalidades.

Todas as regras estão organizadas por épicos e vinculadas às User Stories.

---

# Épico 1 – Autenticação

---

### RN01 – Login obrigatório
- O usuário deve estar autenticado para acessar rotas protegidas  
- Requisições sem token devem retornar **401 (Unauthorized)**  

---

### RN02 – Token válido
- O token enviado deve ser válido e não expirado  
- Tokens inválidos devem retornar **401 (Unauthorized)**  

---

### RN03 – Geração de token
- O sistema deve gerar um token ao realizar login com sucesso  
- O token deve ser utilizado nas requisições subsequentes  

---

### RN05 – Nome não pode ser vazio
O campo name não pode ser vazio ou conter apenas espaços
Requisições com campo vazio devem retornar 400 (Bad Request)

# Épico 2 – Gestão de Grupos

---

### RN04 – Nome obrigatório
- O campo `name` é obrigatório no cadastro de grupo  
- Requisições sem o campo devem retornar **400 (Bad Request)**  

---

### RN05 – Nome não pode ser vazio
- O campo `name` não pode ser vazio ou conter apenas espaços  

---

### RN06 – Não permitir duplicidade
- Não deve ser possível cadastrar grupos com nomes duplicados  

---

### RN07 – ID único
- Cada grupo deve possuir um identificador único gerado automaticamente  

---

### RN08 – Listagem de grupos
- A API deve retornar todos os grupos cadastrados  
- Caso não existam registros, deve retornar lista vazia com status **200 (OK)**  

---

### RN09 – Atualização de grupo
- Apenas grupos existentes podem ser atualizados  
- Caso o ID não exista, retornar **404 (Not Found)**  

---

### RN10 – Exclusão de grupo
- Apenas grupos existentes podem ser removidos  
- Caso o ID não exista, retornar **404 (Not Found)**  

---

### RN11 – Rotas protegidas
- As operações de criar, atualizar e deletar grupos exigem autenticação  

---

# Épico 3 – Validações Gerais

---

### RN12 – Formato da requisição
- A API deve aceitar apenas requisições no formato JSON válido  

---

### RN13 – Códigos de resposta HTTP
A API deve seguir os padrões:

- **200 (OK)** → Sucesso  
- **201 (Created)** → Recurso criado com sucesso  
- **400 (Bad Request)** → Erro de validação  
- **401 (Unauthorized)** → Falha de autenticação  
- **404 (Not Found)** → Recurso não encontrado  

---

### RN14 – Consistência dos dados
- As respostas da API devem seguir um padrão consistente de estrutura  

---

### RN15 – Generation deve ser positivo
O campo generation deve ser um número inteiro positivo
Valores negativos ou zero devem retornar 400 (Bad Request)

---

### RN16 – Limite de caracteres no nome
O campo name deve respeitar um limite máximo de caracteres
Valores que excedam o limite devem retornar 400 (Bad Request)

---

# Rastreabilidade (Traceability)

| Regra | Relacionada à User Story |
|------|--------------------------|
| RN01 | US03 |
| RN02 | US03 |
| RN03 | US01 |
| RN04 | US04 |
| RN05 | US04 |
| RN06 | US04 |
| RN07 | US04 |
| RN08 | US05 |
| RN09 | US06 |
| RN10 | US07 |
| RN11 | US03, US04, US06, US07 |
| RN12 | Todas |
| RN13 | Todas |
| RN14 | Todas |
| RN15 | US04 |
| RN16 | US04 |
---

# Observações

- Cada regra de negócio deve ser validada por cenários e casos de teste  
- As regras são fundamentais para a criação de testes automatizados  
- Qualquer violação dessas regras deve ser registrada como bug  

---