# Evidências de Teste

## Ferramenta utilizada
- Mocha
- Supertest
- Chai
- Mochawesome
- Postman

---

## Tipo de evidência
- Testes automatizados executados via terminal
- Relatório HTML gerado pelo Mochawesome

---

## Resultado
Todos os testes de API passaram com sucesso:

✔ Auth
✔ CRUD Groups
✔ Testes negativos

---
## Evidências — Testes Manuais Postman

### Autenticação

#### EVD-01 — Login com sucesso
<img width="1920" height="1032" alt="Post_Login com sucesso" src="https://github.com/user-attachments/assets/14aa6f20-8372-49b3-8d7c-356bbe0309c9" />

#### EVD-02 — Login com credenciais erradas
<img width="1920" height="1032" alt="Login com credenciais erradas" src="https://github.com/user-attachments/assets/af6c5b6b-3578-40c3-b65d-fda7ec259875" />

#### EVD-03 — Login com body vazio
<img width="1920" height="1032" alt="Login com body vazio" src="https://github.com/user-attachments/assets/d8cf3a4a-029d-4030-bde9-7d3b947596e5" />

### Grupos

#### EVD-04 — Listar todos os grupos
<img width="1920" height="1032" alt="Listar todos os grupos" src="https://github.com/user-attachments/assets/fb13658c-0c59-4eca-8118-3709d9a858b1" />

#### EVD-05 — Listar grupos sem token
<img width="1920" height="1032" alt="Listar grupos sem token" src="https://github.com/user-attachments/assets/002853e6-1f0a-45c7-abd9-20364f39048a" />

#### EVD-06 — Buscar grupo por ID válido
<img width="1920" height="1032" alt="Buscar gurpo por ID válido" src="https://github.com/user-attachments/assets/78f719c9-b943-409e-adfd-af8a5102e2c7" />

#### EVD-07 — Buscar grupo por ID inexistente
<img width="1920" height="1032" alt="Buscar grupo por ID inexistente" src="https://github.com/user-attachments/assets/9eaea6de-47e0-4bed-baf1-74df78cb5a3e" />

#### EVD-08 — Buscar grupo por ID inválido (BR-006)
<img width="1920" height="1032" alt="Buscar grupo por ID inválido" src="https://github.com/user-attachments/assets/2022b306-6ac9-4cd6-afb4-34064510e686" />

#### EVD-09 — Criar grupo
<img width="1920" height="1032" alt="Criar grupo válido" src="https://github.com/user-attachments/assets/3b33f593-430b-4ed9-8716-dc16040d6ae8" />

#### EVD-10 — Criar grupo com nome duplicado
<img width="1920" height="1032" alt="Criar grupo com nome duplicado" src="https://github.com/user-attachments/assets/8ee282ff-d9f3-4a3a-965b-e6e2a96b0d36" />

#### EVD-11 — Criar grupo sem campo name
<img width="1920" height="1032" alt="Criar grupo sem campo name" src="https://github.com/user-attachments/assets/abac41b3-dbe4-42a4-bc1d-0c6cf1eb4df7" />

#### EVD-12 — Criar grupo com generation negativo (BR-007)
<img width="1920" height="1032" alt="Criar grupo com generation negativo" src="https://github.com/user-attachments/assets/a358fb66-ca19-4760-9592-f228bbc742fb" />

#### EVD-13 — Criar grupo com name muito longo (BR-008)
<img width="1920" height="1032" alt="Criar grupo com nome longo" src="https://github.com/user-attachments/assets/79273730-52b1-4254-9d11-576f034800fb" />

#### EVD-14 — Atualizar grupo existente
<img width="1920" height="1032" alt="Atualizar grupo existente" src="https://github.com/user-attachments/assets/083c0fb7-11f5-4bb0-a9b6-9e88be6b12e2" />

#### EVD-15 — Atualizar grupo com ID inexistente
<img width="1920" height="1032" alt="Atualizar grupo com ID Inexistente" src="https://github.com/user-attachments/assets/14a97757-47cf-4438-aee0-d248f42433a1" />

#### EVD-16 — Deletar grupo existente
<img width="1920" height="1032" alt="Deletar grupo existente" src="https://github.com/user-attachments/assets/34938632-f02b-4d32-8a2d-03138a5094af" />

#### EVD-17 — Buscar grupo deletado
<img width="1920" height="1032" alt="Buscar grupo deletado" src="https://github.com/user-attachments/assets/939f9457-dc1e-41d9-9959-2639990ce8aa" />

#### EVD-18 — Deletar grupo com ID inexistente
<img width="1920" height="1032" alt="Deletar grupo com Id inexistente" src="https://github.com/user-attachments/assets/3db85b05-4daf-4f90-b118-6f3c518e19f5" />
