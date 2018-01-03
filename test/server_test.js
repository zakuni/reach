const assert = require('assert');
const app = require('../server');
const server = app.listen();
const request = require('supertest').agent(server);

module.exports = {
  'GET /': {
    'returns 200': async function() {
      const response = await request.get('/');
      assert.equal(response.status, 200);
    }
  },

  'GET /index': {
    'returns 302': async function() {
      const response = await request.get('/index');
      assert.equal(response.status, 302);
    }
  },

  'GET /new': {
    'returns 302': async function() {
      const response = await request.get('/new');
      assert.equal(response.status, 302);
    }
  },

  'GET /logout': {
    'returns 302': async function() {
      const response = await request.get('/logout');
      assert.equal(response.status, 302);
    }
  },

  'POST /api/reports': {
    'returns 401': async function() {
      const response = await request.post('/api/reports');
      assert.equal(response.status, 401);
    }
  },

  'GET /api/reports': {
    'returns 401': async function() {
      const response = await request.get('/api/reports');
      assert.equal(response.status, 401);
    }
  },

  'PUT /api/reports': {
    'returns 401': async function() {
      const response = await request.put('/api/reports');
      assert.equal(response.status, 401);
    }
  },

  'GET /api/me': {
    'returns 401': async function() {
      const response = await request.get('/api/me');
      assert.equal(response.status, 401);
    }
  },

  after: async function() {
    await server.close();
  }
};
