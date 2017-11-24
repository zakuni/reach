const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: {
    type: String,
    required: true,
    validate: {
      validator: async function(v) {
        await this.model('Report').count({ author: this.author, title: v }) === 0;
      },
      message: '{VALUE} already exists'
    }
  },
  content: String
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);

