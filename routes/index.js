const router = require('express').Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const { NotfoundIdError } = require('../customErrors/NotfoundIdError');
const { login, createUser } = require('../controllers/users');
const { validateSignup, validateSignin } = require('../middlewares/validations');

router.post('/signin', validateSignin, login);
router.post('/signup', validateSignup, createUser);
router.use(auth);
router.use('/', userRouter);
router.use('/', moviesRouter);
router.use((req, res, next) => next(new NotfoundIdError('Страница не найдена')));

module.exports = router;
