# Plano de Testes

## Referência
- ISO/IEC/IEEE 29119-1: Conceitos e definições
- ISO/IEC/IEEE 29119-2: Processo de testes
- ISO/IEC/IEEE 29119-3: Documentação de testes

## 1. Introdução
Este plano de testes descreve a estratégia e o escopo para validar a API K-pop, garantindo que os itens de teste estejam cobertos por casos e critérios de aceitação aprovados.

## 2. Objetivos
- Garantir qualidade funcional da API de grupos de K-pop.
- Validar regras de negócio e requisitos de autenticação.
- Verificar a conformidade com o contrato Swagger e a documentação de API.
- Detectar defeitos antes da entrega.

## 3. Itens de Teste
- Autenticação de usuário via `POST /api/auth/login`
- Criação de grupo via `POST /api/groups`
- Listagem de grupos via `GET /api/groups`
- Consulta de grupo por ID via `GET /api/groups/{id}`
- Atualização de grupo via `PUT /api/groups/{id}`
- Exclusão de grupo via `DELETE /api/groups/{id}`

## 4. Recursos de Teste
- `src/routes/groupRoutes.js` (Swagger / contrato de API)
- `src/controllers/groupController.js`
- `src/services/groupService.js`
- `test/integration/groups.test.js`
- `wiki/Casos-de-Teste.md`

## 5. Abordagem de Teste
### 5.1 Testes Funcionais
- Executar casos de teste automatizados que validam os fluxos de API.
- Validar respostas HTTP, payload e regras de negócio.

### 5.2 Testes de Regressão
- Re-executar casos existentes sempre que houver alterações em endpoints ou regras.
- Garantir que novos recursos não quebrem funcionalidades prévias.

### 5.3 Testes de Segurança Básicos
- Verificar acesso sem token.
- Verificar token inválido.

## 6. Critérios de Saída
### 6.1 Critérios de Entrada
- Código compilado e API disponível localmente.
- Dependências instaladas (`npm install`).
- Ambiente de teste configurado.

### 6.2 Critérios de Saída
- Todos os testes automatizados relevantes passam.
- Nenhum defeito crítico aberto nos endpoints principais.
- Documentação de casos de teste atualizada.

## 7. Cronograma de Testes
- Preparação: definir escopo e ambiente.
- Execução: rodar casos de teste automatizados.
- Avaliação: revisar resultados e re-testar após correção.

## 8. Ambiente de Teste
- Ambiente local com Node.js.
- URL base de teste: `http://localhost:3000/api`
- Variáveis de ambiente de Postman / testes automatizados conforme `postman/kpop-local.environment.json`.

## 9. Riscos e Restrições
- Diferenças entre a especificação Swagger e a implementação podem gerar falsos positivos.
- Dependência de autenticação e dados iniciais no banco em memória.
- Arquivos Postman ausentes na coleção do repositório podem reduzir cobertura de integração manual.

## 10. Responsabilidades
- Desenvolvedora: manter casos de teste automatizados e documentação atualizada.
- Time de QA: revisar evidências e validar resultados.

## 11. Plano de Rastreamento
- Os casos de teste são rastreáveis para os requisitos da API e para o arquivo `test/integration/groups.test.js`.
- O documento `wiki/Casos-de-Teste.md` complementa este plano com casos detalhados.

## 12. Documentos Relacionados
- `README.md`
- `wiki/Casos-de-Teste.md`
- `src/routes/groupRoutes.js`
- `test/integration/groups.test.js`
