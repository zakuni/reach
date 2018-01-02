const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: { type: String, unique: true },
  username: { type: String, unique: true },
  profile_image_url: String,
  reports: [{ type: Schema.Types.ObjectId, ref: 'Report'}]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
