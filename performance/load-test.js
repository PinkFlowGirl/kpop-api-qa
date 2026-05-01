import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate = new Rate('errors');
const authLatency = new Trend('auth_latency');
const groupLatency = new Trend('group_latency');

const BASE_URL = 'http://localhost:3000/api';

export const options = {
  stages: [
    { duration: '5s', target: 5 },
    { duration: '15s', target: 20 },
    { duration: '10s', target: 10 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    errors: ['rate<0.05'],
    auth_latency: ['p(99)<1000'],
    group_latency: ['p(95)<500'],
  },
};

export function setup() {
  console.log('🚀 Iniciando testes de performance...');

  const loginRes = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({
      username: 'admin',
      password: '123',
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  console.log('SETUP STATUS:', loginRes.status);
  console.log('SETUP BODY:', loginRes.body);

  check(loginRes, {
    'Setup login OK': (r) => r.status === 200,
  });

  if (loginRes.status !== 200) {
    throw new Error('Login falhou no setup');
  }

  const data = loginRes.json();

  return { token: data.token };
}

export default function (data) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${data.token}`,
  };

  // ---------------- LOGIN TEST ----------------
  group('01 - Autenticação', () => {
    const res = http.post(
      `${BASE_URL}/auth/login`,
      JSON.stringify({
        username: 'admin',
        password: '123',
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );

    authLatency.add(res.timings.duration);

    check(res, {
      'login status 200': (r) => r.status === 200,
      'login tem token': (r) => !!r.json('token'),
    });

    sleep(0.3);
  });

  // ---------------- GET ----------------
  group('02 - GET Groups', () => {
    const res = http.get(`${BASE_URL}/groups`, { headers });

    groupLatency.add(res.timings.duration);

    check(res, {
      'GET status 200': (r) => r.status === 200,
      'GET é array': (r) => Array.isArray(r.json()),
    });

    if (res.status !== 200) errorRate.add(1);

    sleep(0.3);
  });

  // ---------------- POST ----------------
  group('03 - POST Groups', () => {
    const newGroup = {
      name: `K-pop Group ${Date.now()}`,
      debutYear: 2024,
      fandom: `KPOP${Math.random().toString(36).substring(2, 8)}`,
      generation: 1, // 👈 importante para evitar erro
    };

    const res = http.post(
      `${BASE_URL}/groups`,
      JSON.stringify(newGroup),
      { headers }
    );

    groupLatency.add(res.timings.duration);

    console.log('POST STATUS:', res.status);
    console.log('POST BODY:', res.body);

    check(res, {
      'POST status 201': (r) => r.status === 201,
      'POST retorna grupo válido': (r) => !!r.json('id'),
    });

    const group = res.json();

    // ---------------- PUT ----------------
    group('04 - PUT Groups', () => {
      const updateRes = http.put(
        `${BASE_URL}/groups/${group.id}`,
        JSON.stringify({
          fandom: `Updated_${Date.now()}`,
          generation: 1,
        }),
        { headers }
      );

      console.log('PUT STATUS:', updateRes.status);
      console.log('PUT BODY:', updateRes.body);

      groupLatency.add(updateRes.timings.duration);

      check(updateRes, {
        'PUT status 200 ou 204': (r) =>
          r.status === 200 || r.status === 204,
      });

      sleep(0.2);
    });

    // ---------------- DELETE ----------------
    group('05 - DELETE Groups', () => {
      const deleteRes = http.del(
        `${BASE_URL}/groups/${group.id}`,
        null,
        { headers }
      );

      console.log('DELETE STATUS:', deleteRes.status);

      groupLatency.add(deleteRes.timings.duration);

      check(deleteRes, {
        'DELETE status 200': (r) => r.status === 200,
      });

      sleep(0.2);
    });
  });

  // ---------------- NEGATIVE TESTS ----------------
  group('06 - Negative Tests', () => {
    const noToken = http.get(`${BASE_URL}/groups`);

    check(noToken, {
      'sem token retorna 401': (r) => r.status === 401,
    });

    const notFound = http.get(
      `${BASE_URL}/groups/999999`,
      { headers }
    );

    check(notFound, {
      'not found 404': (r) => r.status === 404,
    });

    sleep(0.2);
  });

  sleep(1);
}