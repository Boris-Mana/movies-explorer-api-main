const { userWrongStatus } = require('../utils/statusNumbers');

class WrongLoginDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'WrongLoginData';
    this.statusCode = userWrongStatus;
  }
}

module.exports = { WrongLoginDataError };
