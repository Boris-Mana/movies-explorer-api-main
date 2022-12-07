const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');

const { WrongLoginDataError } = require('../customErrors/WrongLoginDataError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new WrongLoginDataError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      JWT_SECRET,
    );
  } catch (e) {
    return next(new WrongLoginDataError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};
