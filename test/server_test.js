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

  after: async function() {
    await server.close();
  }
};
