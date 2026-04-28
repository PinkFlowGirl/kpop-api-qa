const request = require('supertest');
const expect = require('chai').expect;

const baseURL = 'http://localhost:3000';

describe('Kpop API - Groups', () => {

  let token = '';
  let groupId = '';

  it('Deve fazer login e retornar token', async () => {
    const res = await request(baseURL)
      .post('/auth/login')
      .send({
        username: 'admin',
        password: '123'
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');

    token = res.body.token;
  });

  it('Deve listar grupos', async () => {
    const res = await request(baseURL)
      .get('/api/groups')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('Deve criar um grupo', async () => {
    const res = await request(baseURL)
      .post('/api/groups')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'IVE',
        debutYear: 2021,
        fandom: 'DIVE'
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');

    groupId = res.body.id;
  });

  it('Deve buscar grupo por ID', async () => {
    const res = await request(baseURL)
      .get(`/api/groups/${groupId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('id');
  });

  it('Deve atualizar grupo', async () => {
    const res = await request(baseURL)
      .put(`/api/groups/${groupId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        fandom: 'DIVE UPDATED'
      });

    expect(res.status).to.equal(200);
  });

  it('Deve deletar grupo', async () => {
    const res = await request(baseURL)
      .delete(`/api/groups/${groupId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
  });

});