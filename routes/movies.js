const moviesRouter = require('express').Router();
const { validateObjId, validateFilmData } = require('../middlewares/validations');
const { deleteMovie, createMovie, getMovies } = require('../controllers/movies');

moviesRouter.delete('/movies/:_id', validateObjId, deleteMovie);
moviesRouter.get('/movies', getMovies);
moviesRouter.post('/movies', validateFilmData, createMovie);

module.exports = moviesRouter;
