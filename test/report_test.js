const assert = require('assert');
const sinon = require('sinon');
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
          const stub = sinon.stub(Report, 'count').returns(0);

          let report = new Report({ author: new User(), title: 'title' });
          let error;
          await report.validate().catch(err => {
            error = err;
          });
          assert.equal(error, undefined);
          stub.restore();
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
      },
      'is unique per user': async function() {
        const stub = sinon.stub(Report, 'count').returns(1);

        let report = new Report({ author: new User(), title: 'title already exists'});
        let error;
        await report.validate().catch(err => {
          error = err;
        });
        assert.equal(error.name, 'ValidationError');
        stub.restore();
      }
    },
    '#content': {
      'is defined key': function() {
        let report = new Report({content: 'content'});
        assert.equal(report.content, 'content');
      }
    },
    '#reached': {
      'is empty array': function() {
        let report = new Report({content: 'content'});
        assert.equal(report.reached.length, 0);
      },
      'when author is self': {
        'is invalid': async function() {
          const stub = sinon.stub(Report, 'count').returns(0);
          let author = new User();
          let report = new Report({author: author, title: 'title', content: 'content'});
          report.reached.push(author._id);
          let error;
          await report.validate().catch(err => {
            error = err;
          });
          assert.equal(error.name, 'ValidationError');
          stub.restore();
        }
      }
    }
  }
};
