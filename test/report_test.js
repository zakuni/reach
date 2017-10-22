const assert = require('assert');
const Report = require('../models/report');
const User   = require('../models/user');

module.exports = {
  'Report': {
    'is invalid without author': async function() {
      let report = new Report();
      let error;
      await report.validate().catch(err => {
        error = err;
      });
      assert.equal(error.name, 'ValidationError');
    },
    'is invalid with author not using User model': async function() {
      let report = new Report({ author: 'author' });
      let error;
      await report.validate().catch(err => {
        error = err;
      });
      assert.equal(error.name, 'ValidationError');
    },
    'is valid with author using User model': async function() {
      let report = new Report({ author: new User() });
      let error;
      await report.validate().catch(err => {
        error = err;
      });
      assert.equal(error, undefined);
    }
  }
};
