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
          let report = new Report({ author: 'author', title: 'title' });
          let error;
          await report.validate().catch(err => {
            error = err;
          });
          assert.equal(error.name, 'ValidationError');
        }
      },
      'when using User model': {
        'is valid': async function() {
          let report = new Report({ author: new User(), title: 'title' });
          let error;
          await report.validate().catch(err => {
            error = err;
          });
          assert.equal(error, undefined);
        }
      }
    },
    '#title': {
      'is defined key': function() {
        let report = new Report({title: 'title'});
        assert.equal(report.title, 'title');
      },
      'is required': async function() {
        let report = new Report({ author: new User() });
        let error;
        await report.validate().catch(err => {
          error = err;
        });
        assert.equal(error.name, 'ValidationError');
      },
      'cannot be blank': async function() {
        let report = new Report({ author: new User(), title: ''});
        let error;
        await report.validate().catch(err => {
          error = err;
        });
        assert.equal(error.name, 'ValidationError');
      }
    },
    '#content': {
      'is defined key': function() {
        let report = new Report({content: 'content'});
        assert.equal(report.content, 'content');
      }
    }
  }
};
