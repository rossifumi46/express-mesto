const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9._]+\.[a-zA-Z]+[a-zA-z\d-._~:/?#[\]@!$&'()*+,;=]*/i;
        return regex.test(v);
      },
      message: 'Неверный URL',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
