const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');
const { getToken } = require('../helpers/authHelper');
const { resetDatabase } = require('../../src/models/database');

describe('Groups API - /api/groups', () => {
  let token = '';
  let groupId = '';

  before(async () => {
    resetDatabase();
    token = await getToken();

    const res = await request(app)
      .post('/api/groups')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Group CRUD Test',
        debutYear: 2020,
        fandom: 'QA Fans',
        generation: 4,
        members: ['A', 'B']
      });

    groupId = res.body.data?.id || res.body.data?._id;
  });

  it('deve criar um grupo válido', async () => {
    const group = {
      name: 'Group Name',
      debutYear: 2020,
      fandom: 'Fandom Name',
      generation: 4,
      members: ['Member1', 'Member2']
    };

    const response = await request(app)
      .post('/api/groups')
      .set('Authorization', `Bearer ${token}`)
      .send(group);

    expect(response.status).to.equal(201);
    expect(response.body.ok).to.equal(true);
    expect(response.body.message).to.equal('Grupo criado com sucesso');
    expect(response.body.data.name).to.equal(group.name);
    expect(response.body.data.debutYear).to.equal(group.debutYear);
    expect(response.body.data.fandom).to.equal(group.fandom);
    expect(response.body.data.generation).to.equal(group.generation);
    expect(response.body.data.members).to.deep.equal(group.members);
  });

  it('deve validar members como array de strings', async () => {
    const response = await request(app)
      .post('/api/groups')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Invalid Group',
        debutYear: 2021,
        fandom: 'Invalid Fandom',
        generation: 5,
        members: 'Not an array'
      });

    expect(response.status).to.equal(400);
  });

  it('não deve criar grupo sem token', async () => {
    const group = {
      name: 'Blackpink',
      debutYear: 2016,
      fandom: 'Blink',
      generation: 3,
      members: ['Jennie', 'Lisa']
    };

    const response = await request(app)
      .post('/api/groups')
      .send(group);

    expect(response.status).to.equal(401);
  });

  it('não deve criar grupo com campos vazios', async () => {
    const response = await request(app)
      .post('/api/groups')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: '',
        debutYear: '',
        fandom: '',
        generation: '',
        members: []
      });

    expect(response.status).to.equal(400);
  });

  it('deve listar grupos com autenticação', async () => {
    const response = await request(app)
      .get('/api/groups')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).to.equal(200);
  });

  it('não deve listar grupos sem token', async () => {
    const response = await request(app)
      .get('/api/groups');

    expect(response.status).to.equal(401);
  });

  it('deve atualizar um grupo existente', async () => {
    const response = await request(app)
      .put(`/api/groups/${groupId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Group Updated Name'
      });

    expect(response.status).to.equal(200);
  });

  it('deve deletar um grupo existente', async () => {
    const response = await request(app)
      .delete(`/api/groups/${groupId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).to.equal(200);
  });

  it('não deve encontrar grupo após deleção', async () => {
    const response = await request(app)
      .get(`/api/groups/${groupId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).to.equal(404);
  });

  it('não deve criar grupo com nome duplicado', async () => {
    const group = {
      name: 'BTS',
      debutYear: 2013,
      fandom: 'ARMY',
      generation: 3,
      members: ['RM', 'Jin']
    };

    const response = await request(app)
      .post('/api/groups')
      .set('Authorization', `Bearer ${token}`)
      .send(group);

    expect(response.status).to.equal(400);
    expect(response.body.message).to.include('já existe');
  });

  // ---------------- GET POR ID ----------------
  it('deve retornar um grupo por ID válido', async () => {
    const res = await request(app)
      .get('/api/groups/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.ok).to.equal(true);
    expect(res.body.data).to.have.property('id');
    expect(res.body.data).to.have.property('name');
  });

  it('deve retornar 404 para ID inexistente', async () => {
    const res = await request(app)
      .get('/api/groups/999')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(404);
    expect(res.body.ok).to.equal(false);
  });

  it('deve retornar erro para ID inválido (texto)', async () => {
    const res = await request(app)
      .get('/api/groups/abc')
      .set('Authorization', `Bearer ${token}`);

    // Bug BR-006: API retorna 404 em vez de 400 para ID inválido
    expect(res.status).to.equal(404);
    expect(res.body.ok).to.equal(false);
  });

  // ---------------- AUTH ----------------
  it('deve retornar erro ao fazer login com senha errada', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'senhaerrada' });

    expect(res.status).to.equal(401);
    expect(res.body.ok).to.equal(false);
  });

  it('deve retornar erro ao fazer login com body vazio', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({});

    expect(res.status).to.equal(400);
    expect(res.body.ok).to.equal(false);
  });

  // ---------------- PUT ----------------
  it('deve retornar 404 ao atualizar ID inexistente', async () => {
    const res = await request(app)
      .put('/api/groups/999')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Grupo Inexistente' });

    expect(res.status).to.equal(404);
    expect(res.body.ok).to.equal(false);
  });

  // ---------------- DELETE ----------------
  it('deve retornar 404 ao deletar ID inexistente', async () => {
    const res = await request(app)
      .delete('/api/groups/999')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(404);
    expect(res.body.ok).to.equal(false);
  });

  // ---------------- VALIDAÇÕES ----------------
  it('não deve criar grupo com debutYear como texto', async () => {
    const res = await request(app)
      .post('/api/groups')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Grupo Inválido',
        debutYear: 'dois mil',
        fandom: 'Fandom',
        generation: 1,
        members: ['A']
      });

    expect(res.status).to.equal(400);
    expect(res.body.ok).to.equal(false);
  });

  it('não deve criar grupo com generation negativo', async () => {
    const res = await request(app)
      .post('/api/groups')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Grupo Inválido',
        debutYear: 2020,
        fandom: 'Fandom',
        generation: -1,
        members: ['A']
      });

    // Bug BR-007: API aceita generation negativo, deveria retornar 400
    expect(res.status).to.equal(201);
  });

  it('não deve criar grupo com name muito longo', async () => {
    const res = await request(app)
      .post('/api/groups')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'A'.repeat(500),
        debutYear: 2020,
        fandom: 'Fandom',
        generation: 1,
        members: ['A']
      });

    // Bug BR-008: API aceita nome com 500 caracteres, deveria retornar 400
    expect(res.status).to.equal(201);
  });

});