const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { validateSchemaEmail } = require('../middlewares/validations');
const { WrongLoginDataError } = require('../customErrors/WrongLoginDataError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Поле 'name' должно быть заполнено"],
    minlength: [2, 'Должно быть не меньше 2 символов'],
    maxlength: [30, 'Должно быть не меньше 30 символов'],
  },
  email: {
    type: String,
    validate: validateSchemaEmail,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Поле 'password' должно быть заполнено"],
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCridentials = function (email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      throw new WrongLoginDataError('Неправильные почта или пароль');
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new WrongLoginDataError('Неправильные почта или пароль');
      }
      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);
