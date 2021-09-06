const { finished } = require('stream');
const logger = require('../common/logger');
const formateJSONstringify = require('../common/utils/formateJSONstringify');

const logInfo = (req, res, next) => {
  const { method, url, body } = req;
  next();

  finished(res, () => {
    const { status } = res;
    logger.info(
      formateJSONstringify({
        method,
        url,
        status,
        body,
      })
    );
  });
};

module.exports = logInfo;
