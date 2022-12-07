require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');

const { MONGO_URL } = require('./config');

const { PORT = 3000 } = process.env;

const app = express();
const routes = require('./routes');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const centralErrHanlder = require('./middlewares/centralErrHandler');

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(cors);
app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(centralErrHanlder);

app.listen(PORT);
