const { STATUS_CODE } = require('../common/constants');
const Result = require('../models/Result');
const {
  createResult,
  updateResult,
  findResult,
} = require('../repositories/result');

const saveResult = async (eventName, room, issueId, results) => {
  const response = {
    eventName,
    code: 0,
    error: '',
    data: {},
  };

  if (!room || !issueId || !results) {
    response.code = STATUS_CODE.BAD_REQUEST.CODE;
    response.error = `${STATUS_CODE.BAD_REQUEST.MESSAGE} room, issueId, results`;
    return response;
  }

  const findResultResp = await findResult(room, issueId);

  let newResult;

  if (!findResultResp) {
    newResult = await createResult(room, issueId, results);
    response.code = STATUS_CODE.CREATED.CODE;
  } else {
    newResult = await updateResult(room, issueId, results);
    response.code = STATUS_CODE.OK.CODE;
  }

  response.data.result = Result.toResponse(newResult);

  return response;
};

module.exports = { saveResult };
