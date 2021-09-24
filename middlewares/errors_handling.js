const { STATUS_CODE } = require('../common/constants');
const logger = require('../common/logger');
const formateJSONstringify = require('../common/utils/formateJSONstringify');

const logError = (errorMessage) => {
  const errorCode = STATUS_CODE.INTERNAL_SERVER_ERROR.CODE;
  logger.error(formateJSONstringify({ errorCode, errorMessage }));
  setTimeout(() => {
    process.exit(1);
  }, 1000);
};

module.exports = { logError };
