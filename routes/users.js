const userRouter = require('express').Router();
const { validateUpdateUser } = require('../middlewares/validations');

const { getUser, updateUser } = require('../controllers/users');

userRouter.get('/users/me', getUser);
userRouter.patch('/users/me', validateUpdateUser, updateUser);

module.exports = userRouter;
