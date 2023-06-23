const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['system admin', 'law enforcement', 'prison', 'court', 'investigation agency']
  },
  accessToken: {
    type: String
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
