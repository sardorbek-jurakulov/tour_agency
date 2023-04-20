const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
    maxlength: [50, 'A tour name must have less or equal then 50 characters'],
    minlength: [2, 'A tour name must have more or equal then 2 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email!'],
    unique: true,
    lowercase: true, // bu validator emas shunchaki kiritilgan qiymatlarni lowercasega o'girib beradi masalan Sardorbek@Gmail.com ni sardorbek@gmail.com ga o'girib beradi.
    validate: [validator.isEmail, 'Please provide a valid email!'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
    validate: {
      validation: function (val) {
        return val === this.password;
      },
      message: 'Confirming password mast be equal with password',
    },
  },
});

const User = mongoose.model('User', userSchema);
// model o'zgaruvchisi katta harfda bo'lgani yaxshi

module.exports = User;