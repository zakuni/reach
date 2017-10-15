const assert = require('assert');
const Report = require('../models/report');

module.exports = {
  'Report': {
    'is invalid without author': async function() {
      let report = new Report();
      await report.validate().catch(err => {
        assert.notStrictEqual(err.errors.author, undefined);
      });
    }
  }
};
