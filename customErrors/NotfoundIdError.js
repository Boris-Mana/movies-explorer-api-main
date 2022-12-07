const { notFoundStatus } = require('../utils/statusNumbers');

class NotfoundIdError extends Error {
  constructor(message) {
    super(message);
    this.name = 'notFound';
    this.statusCode = notFoundStatus;
  }
}

module.exports = { NotfoundIdError };
