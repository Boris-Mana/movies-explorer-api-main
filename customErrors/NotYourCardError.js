const { notYourDataStatus } = require('../utils/statusNumbers');

class NotYourCardError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotYourCard';
    this.statusCode = notYourDataStatus;
  }
}

module.exports = { NotYourCardError };
