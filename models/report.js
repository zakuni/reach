const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  author: { type: String, required: true }
});

module.exports = mongoose.model('Report', reportSchema);

