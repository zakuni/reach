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
    '#author': {
      'when not using User model': {
        'is invalid': async function() {
          let report = new Report({ author: 'author' });
          let error;
          await report.validate().catch(err => {
            error = err;
          });
          assert.equal(error.name, 'ValidationError');
        }
      },
      'when using User model': {
        'is valid': async function() {
          let report = new Report({ author: new User() });
          let error;
          await report.validate().catch(err => {
            error = err;
          });
          assert.equal(error, undefined);
        }
      }
    }
  }
};
