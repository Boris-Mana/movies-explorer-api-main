const { incorrectDataStatus } = require('../utils/statusNumbers');

class WrongDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'WrongData';
    this.statusCode = incorrectDataStatus;
  }
}

module.exports = { WrongDataError };
