const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const findOrCreate = require('mongoose-findorcreate');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  reports: [{ type: Schema.Types.ObjectId, ref: 'Report'}]
}, { timestamps: true });
userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
