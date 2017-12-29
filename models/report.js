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
        const count = await this.model('Report').count({ author: this.author._id, title: v });
        return new Promise((resolve, reject) => {
          resolve(count === 0);
        });
      },
      message: '{VALUE} already exists'
    }
  },
  content: String,
  reached: [{
    type: Schema.Types.ObjectId, ref: 'User',
    validate: {
      validator: function(v){
        return new Promise(resolve => {
          resolve(!v.includes(this.author._id) && !v.includes(this.author._id));
        });
      }
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);

