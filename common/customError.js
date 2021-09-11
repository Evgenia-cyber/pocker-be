class CustomError extends Error {
  constructor(statusCode, errorMessage, eventName) {
    super();
    this.status = statusCode;
    this.error = errorMessage;
    this.eventName = eventName;
  }
}

module.exports = CustomError;
