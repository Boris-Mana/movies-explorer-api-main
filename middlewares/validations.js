const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const valUrl = Joi.string().required().custom((value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message('Поле должно быть валидным URL-адресом');
})
  .messages({
    'string.required': 'Поле обязательно к заполнению',
  });

const valStrRequired = Joi.string().required().messages({
  'string.required': 'Поле обязательно к заполнению',
});

const valNumRequired = Joi.number().required().messages({
  'string.number': 'В поле "duration" должны быть цифры',
  'string.required': 'Поле обязательно к заполнению',
});

const validateObjId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
});

const validateFilmData = celebrate({
  body: Joi.object().keys({
    country: valStrRequired,
    director: valStrRequired,
    duration: valNumRequired,
    year: valStrRequired,
    description: valStrRequired,
    image: valUrl,
    trailerLink: valUrl,
    nameRU: valStrRequired,
    nameEN: valStrRequired,
    thumbnail: valUrl,
    movieId: valNumRequired,
  }),
});

const validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateSchemaUrl = {
  validator(v) {
    return validator.isURL(v);
  },
  message: 'Введите правильный url-адрес',
};

const validateSchemaEmail = {
  validator(v) {
    return validator.isEmail(v);
  },
  message: 'Введите корректный почтовый ящик',
};

module.exports = {
  validateObjId,
  validateFilmData,
  validateSignup,
  validateSignin,
  validateUpdateUser,
  validateSchemaUrl,
  validateSchemaEmail,
};
