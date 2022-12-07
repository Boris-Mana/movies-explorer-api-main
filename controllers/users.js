const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const SALT_ROUNDS = 10;
const { JWT_SECRET } = require('../config');

const { NotfoundIdError } = require('../customErrors/NotfoundIdError');
const { WrongDataError } = require('../customErrors/WrongDataError');
const { AlreadyExistsError } = require('../customErrors/AlreadyExistsError');

const {
  registerdStatus,
} = require('../utils/statusNumbers');

const validationError = 'ValidationError';
const castError = 'CastError';

module.exports.getUser = (req, res, next) => {
  const currentUserId = req.params.id || req.user._id;
  User.findById(currentUserId)
    .then((user) => {
      if (!user) {
        throw new NotfoundIdError('Объект с таким ID не найден');
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCridentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    }).catch((err) => {
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, SALT_ROUNDS).then((hash) => User.create({
    name, email, password: hash,
  }))
    .then(() => {
      res.status(registerdStatus)
        .send({
          user: {
            name, email,
          },
        });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new AlreadyExistsError('Такой пользователь уже существует.'));
      }
      if (err.name === validationError) {
        return next(new WrongDataError('Переданы некорректные данные при создании пользователя'));
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new AlreadyExistsError('Такой пользователь уже существует.'));
      }
      if (err.name === validationError || err.name === castError) {
        return next(new WrongDataError('Некорректные данные при обновлении профиля.'));
      }
      return next(err);
    });
};
