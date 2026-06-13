const request = require('supertest');
const app = require('../../app');

async function getToken() {
  const response = await request(app)
    .post('/api/auth/login')
    .send({
      username: 'admin',
      password: 'Admin2026!'
    });

  if (response.status !== 200) {
    throw new Error(`Falha ao autenticar: ${response.status}`);
  }

  if (!response.body.token) {
    throw new Error('Token não retornado na resposta de login');
  }

  return response.body.token;
}

module.exports = { getToken };