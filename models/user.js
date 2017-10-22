const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  reports: [{ type: Schema.Types.ObjectId, ref: 'Report'}]
});

module.exports = mongoose.model('User', userSchema);
