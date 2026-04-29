import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // usuários virtuais
  duration: '10s', // tempo do teste
};

export default function () {
  const res = http.get('http://localhost:3000/groups');

  check(res, {
    'status é 200': (r) => r.status === 200,
  });

  sleep(1);
}