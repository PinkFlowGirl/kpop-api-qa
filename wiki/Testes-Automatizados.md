# Testes Automatizados

## Visão Geral

Esta seção descreve a implementação e execução dos testes automatizados da API de K-pop.

Os testes automatizados têm como objetivo validar o comportamento da API de forma rápida, confiável e repetível.

---

## Tecnologias Utilizadas

- Node.js
- Mocha (framework de testes)
- Chai (biblioteca de asserções)
- Supertest (testes de API HTTP)

---

## Estrutura de Pastas

test/
├── helpers/
│   └── authHelper.js
└── integration/
    └── groups.test.js

---

## Como executar os testes

### 1. Instalar dependências

```bash
npm install

2. Executar todos os testes

npm test

3. Executar testes específicos

npx mocha test/groups.test.js

Configuração do script de teste

No arquivo package.json, deve existir o seguinte script:

"scripts": {
  "test": "mocha test/**/*.js"
}

---


## Cobertura dos Testes

### Os testes automatizados cobrem as seguintes funcionalidades:

### Autenticação
- Login com sucesso
- Login inválido
- Geração de token
- Acesso a rotas protegidas

### Gestão de Grupos
- Criar grupo
- Listar grupos
- Atualizar grupo
- Deletar grupo

### Validações
- Campos obrigatórios
- Dados inválidos
- Requisições sem token
- IDs inexistentes

---

## Exemplo de Teste

### Criar grupo com sucesso

const request = require('supertest');
const app = require('../../app');
const { expect } = require('chai');
const { getToken } = require('../helpers/authHelper');

describe('POST /api/groups', () => {
  it('deve criar um grupo com sucesso', async () => {
    const token = await getToken();

    const response = await request(app)
      .post('/api/groups')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'BLACKPINK',
        fandom: 'BLINK',
        debutYear: 2016,
        generation: 3,
        members: ['Jisoo', 'Jennie', 'Rosé', 'Lisa']
      });

    expect(response.status).to.equal(201);
    expect(response.body.ok).to.equal(true);
    expect(response.body.data).to.have.property('name', 'BLACKPINK');
  });
});
---

## Rastreabilidade

#### Os testes automatizados estão vinculados aos casos de teste definidos:

- TST-API-01 → test/integration/groups.test.js (login)
- TST-API-02 → test/integration/groups.test.js (criar grupo válido)
- TST-API-03 → test/integration/groups.test.js (nome duplicado)
- TST-API-04 → test/integration/groups.test.js (payload inválido)
- TST-API-05 → test/integration/groups.test.js (listar grupos)
- TST-API-06 → test/integration/groups.test.js (sem token)
- TST-API-07 → test/integration/groups.test.js (GET por ID válido)
- TST-API-08 → test/integration/groups.test.js (GET ID inexistente)
- TST-API-09 → test/integration/groups.test.js (atualizar grupo)
- TST-API-10 → test/integration/groups.test.js (deletar grupo)
- TST-API-11 → test/integration/groups.test.js (grupo removido)
- TST-API-12 → test/integration/groups.test.js (login senha errada)
- TST-API-13 → test/integration/groups.test.js (login body vazio)
- TST-API-14 → test/integration/groups.test.js (ID inválido)
- TST-API-15 → test/integration/groups.test.js (PUT ID inexistente)
- TST-API-16 → test/integration/groups.test.js (DELETE ID inexistente)
- TST-API-17 → test/integration/groups.test.js (debutYear como texto)
- TST-API-18 → test/integration/groups.test.js (generation negativo)
- TST-API-19 → test/integration/groups.test.js (name muito longo)

---

### Benefícios

- Execução rápida dos testes
- Redução de erros manuais
- Validação contínua da API
- Facilidade de manutenção

--- 

### Observações
Os testes devem ser executados sempre que houver alteração no código
Novas funcionalidades devem incluir novos testes
Testes devem cobrir cenários positivos e negativos


---



