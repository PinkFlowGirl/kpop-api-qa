import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Métricas customizadas
const errorRate = new Rate('errors');
const authLatency = new Trend('auth_latency');
const groupLatency = new Trend('group_latency');
const loginFailures = new Rate('login_failures');

const BASE_URL = 'http://localhost:3000/api';

export const options = {
  stages: [
    { duration: '5s', target: 5 },    // Ramp-up: 5 VUs
    { duration: '15s', target: 20 },  // Stay: 20 VUs
    { duration: '10s', target: 50 },  // Spike: 50 VUs
    { duration: '5s', target: 0 },    // Ramp-down
  ],
  thresholds: {
    'http_req_duration': ['p(95)<500', 'p(99)<1000'], // 95% requests < 500ms, 99% < 1s
    'http_req_failed': ['rate<0.1'],                   // Taxa de erro < 10%
    'errors': ['rate<0.05'],                           // Taxa de erro < 5%
    'auth_latency': ['p(99)<1000'],                    // Auth 99º percentil < 1s
    'group_latency': ['p(95)<500'],                    // Group ops 95º percentil < 500ms
  },
};

let token = ''; // Armazenar token JWT para requisições subsequentes

export function setup() {
  // Setup: executar uma vez antes de todos os testes
  console.log('🚀 Iniciando testes de performance...');
  
  // Tentar fazer login para obter token
  const loginRes = http.post(`${BASE_URL}/auth/login`, JSON.stringify({
    username: 'admin',
    password: '123',
  }), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(loginRes, {
    'Setup: login bem-sucedido': (r) => r.status === 200,
  });

  if (loginRes.status !== 200) {
    console.error(`❌ Erro no login: ${loginRes.status}`);
    throw new Error(`Login failed with status ${loginRes.status}`);
  }

  let loginData;
  try {
    loginData = loginRes.json();
  } catch (e) {
    console.error(`❌ Erro ao fazer parse do JSON: ${loginRes.body}`);
    throw e;
  }

  if (!loginData.token) {
    throw new Error('No token received from login');
  }

  console.log('✅ Token obtido com sucesso para testes');
  return { token: loginData.token };
}

export default function (data) {
  const authToken = data.token;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`,
  };

  group('01 - Autenticação', () => {
    const loginStartTime = new Date();
    
    const loginRes = http.post(`${BASE_URL}/auth/login`, JSON.stringify({
      username: 'admin',
      password: '123',
    }), {
      headers: { 'Content-Type': 'application/json' },
    });

    const loginDuration = new Date() - loginStartTime;
    authLatency.add(loginDuration);

    check(loginRes, {
      'login: status 200': (r) => r.status === 200,
      'login: tem token': (r) => {
        try {
          return r.json('token') !== null;
        } catch {
          return false;
        }
      },
    });

    const invalidLoginRes = http.post(`${BASE_URL}/auth/login`, JSON.stringify({
      username: 'invalid',
      password: 'wrong',
    }), {
      headers: { 'Content-Type': 'application/json' },
    });

    check(invalidLoginRes, {
      'login inválido: status 401': (r) => r.status === 401,
    });

    if (invalidLoginRes.status !== 401) {
      loginFailures.add(1);
    }

    sleep(0.5);
  });

  group('02 - Listar Grupos (GET)', () => {
    const groupStartTime = new Date();
    
    const getRes = http.get(`${BASE_URL}/groups`, { headers });
    
    const groupDuration = new Date() - groupStartTime;
    groupLatency.add(groupDuration);

    check(getRes, {
      'GET /groups: status 200': (r) => r.status === 200,
      'GET /groups: é array': (r) => {
        try {
          return Array.isArray(r.json());
        } catch {
          return false;
        }
      },
    });

    if (getRes.status !== 200) {
      errorRate.add(1);
    }

    sleep(0.3);
  });

  group('03 - Criar Grupo (POST)', () => {
    const groupStartTime = new Date();
    
    const newGroup = {
      name: `K-pop Group ${Date.now()}`,
      debutYear: 2024,
      fandom: `KPOP${Math.random().toString(36).substr(2, 9)}`,
    };

    const postRes = http.post(`${BASE_URL}/groups`, JSON.stringify(newGroup), { headers });
    
    const groupDuration = new Date() - groupStartTime;
    groupLatency.add(groupDuration);

    check(postRes, {
      'POST /groups: status 201': (r) => r.status === 201,
      'POST /groups: retorna grupo': (r) => {
        try {
          return r.json('_id') !== null;
        } catch {
          return false;
        }
      },
    });

    if (postRes.status !== 201) {
      errorRate.add(1);
    }

    // Guardar ID para testes subsequentes
    let createdGroup = null;
    try {
      createdGroup = postRes.json();
    } catch (e) {
      // Se não conseguir fazer parse, continua sem fazer testes subsequentes
    }

    if (createdGroup && createdGroup._id) {
      group('04 - Buscar Grupo por ID (GET)', () => {
        const getByIdRes = http.get(`${BASE_URL}/groups/${createdGroup._id}`, { headers });

        check(getByIdRes, {
          'GET /groups/:id: status 200': (r) => r.status === 200,
          'GET /groups/:id: nome correto': (r) => {
            try {
              return r.json('name') === newGroup.name;
            } catch {
              return false;
            }
          },
        });

        sleep(0.2);
      });

      group('05 - Atualizar Grupo (PUT)', () => {
        const groupStartTime = new Date();
        
        const updateRes = http.put(
          `${BASE_URL}/groups/${createdGroup._id}`,
          JSON.stringify({ fandom: `Updated_${Date.now()}` }),
          { headers }
        );

        const groupDuration = new Date() - groupStartTime;
        groupLatency.add(groupDuration);

        check(updateRes, {
          'PUT /groups/:id: status 200': (r) => r.status === 200,
          'PUT /groups/:id: atualiza dado': (r) => {
            try {
              return r.json('fandom').includes('Updated');
            } catch {
              return false;
            }
          },
        });

        sleep(0.2);
      });

      group('06 - Deletar Grupo (DELETE)', () => {
        const groupStartTime = new Date();
        
        const deleteRes = http.delete(`${BASE_URL}/groups/${createdGroup._id}`, { headers });

        const groupDuration = new Date() - groupStartTime;
        groupLatency.add(groupDuration);

        check(deleteRes, {
          'DELETE /groups/:id: status 200': (r) => r.status === 200,
        });

        sleep(0.1);
      });
    }

    sleep(0.3);
  });

  group('07 - Testes de Erro', () => {
    // Requisição sem token
    const noTokenRes = http.get(`${BASE_URL}/groups`);
    check(noTokenRes, {
      'sem token: status 401': (r) => r.status === 401,
    });

    // Grupo que não existe
    const notFoundRes = http.get(`${BASE_URL}/groups/nonexistent123`, { headers });
    check(notFoundRes, {
      'GET /groups/:id inexistente: status 404': (r) => r.status === 404,
    });

    sleep(0.2);
  });

  sleep(1);
}