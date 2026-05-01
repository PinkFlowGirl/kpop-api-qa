const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');
const { getToken } = require('../helpers/authHelper');

describe('Groups API - /api/groups', () => {
  let token = '';
  let groupId = '';

  before(async () => {
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

    groupId = res.body._id || res.body.id;
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
    expect(response.body.name).to.equal(group.name);
    expect(response.body.debutYear).to.equal(group.debutYear);
    expect(response.body.fandom).to.equal(group.fandom);
    expect(response.body.generation).to.equal(group.generation);
    expect(response.body.members).to.deep.equal(group.members);
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

});