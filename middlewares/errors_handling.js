const { STATUS_CODE } = require('../common/constants');
const logger = require('../common/logger');
const formateJSONstringify = require('../common/utils/formateJSONstringify');

const wrapper = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (err) {
    next(err);
  }
};

const catchAndLogErrors = async (err, _req, res, next) => {
  const errorStatus = err.status
    ? err.status
    : STATUS_CODE.INTERNAL_SERVER_ERROR.CODE;

  const errorMessage = err.error
    ? err.error
    : STATUS_CODE.INTERNAL_SERVER_ERROR.MESSAGE;

  await res.status(errorStatus).json({ error: errorMessage });

  logger.error(
    formateJSONstringify({ status: errorStatus, error: errorMessage })
  );

  next();
};

const logError = (errorMessage) => {
  const errorCode = STATUS_CODE.INTERNAL_SERVER_ERROR.CODE;
  logger.error(formateJSONstringify({ errorCode, errorMessage }));
  setTimeout(() => {
    process.exit(1);
  }, 1000);
};

module.exports = { catchAndLogErrors, wrapper, logError };
