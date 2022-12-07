const Movie = require('../models/movie');

const { NotfoundIdError } = require('../customErrors/NotfoundIdError');
const { WrongDataError } = require('../customErrors/WrongDataError');
const { NotYourCardError } = require('../customErrors/NotYourCardError');

const { deleteSuccessStatus } = require('../utils/statusNumbers');

const validationErrorName = 'ValidationError';
const castErrorName = 'CastError';

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === validationErrorName) {
        next(new WrongDataError(`Переданы некорректные данные для получении карточки. Ошибка ${err.name} ${err.message}`));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  Movie.findOne({ _id })
    .orFail(new NotfoundIdError('Объект с таким ID не найден'))
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Movie.remove().then(() => {
          res.status(deleteSuccessStatus).send({ card });
        }).catch(next);
      } else {
        throw new NotYourCardError('Чужую запись удалять нельзя');
      }
    })
    .catch((err) => {
      if (err.name === castErrorName) {
        return next(new WrongDataError(`Переданы некорректные данные для получении списка карточек. Ошибка ${err.name} ${err.message}`));
      }
      return next(err);
    });
};
