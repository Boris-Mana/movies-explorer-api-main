require('dotenv').config();

const {
  JWT_SECRET,
  MONGO_URL,
  NODE_ENV,
} = process.env;

module.exports = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : '295bdc04a15135ff9ce7dbf9cb3af82c',
  MONGO_URL: NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/moviesdb',
};
