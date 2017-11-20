const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  content: String
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);

