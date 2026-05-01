const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');
const { getToken } = require('../helpers/authHelper');

describe('Kpop API - Groups', () => {
  let token = '';

  before(async () => {
    token = await getToken();
  });

  describe('POST /api', () => {

    it('deve criar um grupo válido', async () => {
      const group = {
        name: 'Group Name',
        debutYear: 2020,
        fandom: 'Fandom Name',
        generation: 4,
        members: ['Member1', 'Member2']
      };

      const response = await request(app)
        .post('/api')
        .set('Authorization', `Bearer ${token}`)
        .send(group);

      expect(response.status).to.equal(201);
      expect(response.body).to.include({
        name: group.name,
        debutYear: group.debutYear,
        fandom: group.fandom,
        generation: group.generation
      });
      expect(response.body.members).to.deep.equal(group.members);
    });

    it('deve validar members como array de strings', async () => {
      const response = await request(app)
        .post('/api')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Invalid Group',
          debutYear: 2021,
          fandom: 'Invalid Fandom',
          generation: 5,
          members: 'Not an array'
        });

      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('O campo "members" deve ser um array de strings');
    });

  });

});