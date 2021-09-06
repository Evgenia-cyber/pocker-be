class CustomError extends Error {
  constructor(statusCode, errorMessage) {
    super();
    this.status = statusCode;
    this.error = errorMessage;
  }
}

module.exports = CustomError;
