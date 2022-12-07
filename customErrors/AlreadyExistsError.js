const { userExistsStatus } = require('../utils/statusNumbers');

class AlreadyExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AlreadyExists';
    this.statusCode = userExistsStatus;
  }
}

module.exports = { AlreadyExistsError };
