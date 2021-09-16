const DEFAULT_PORT = 5000;

const STATUS_CODE = {
  OK: { CODE: 200, MESSAGE: '' },
  CREATED: { CODE: 201, MESSAGE: '' },
  DELETED: { CODE: 204, MESSAGE: '' },
  BAD_REQUEST: { CODE: 400, MESSAGE: 'Bad request. Required data: ' },
  UNAUTHORIZED: { CODE: 401, MESSAGE: 'Unauthorized' },
  FORBIDDEN: { CODE: 403, MESSAGE: 'Forbidden' },
  NOT_FOUND: { CODE: 404, MESSAGE: 'not found' },
  INTERNAL_SERVER_ERROR: { CODE: 500, MESSAGE: 'Internal server error' },
};

const KICKED_ID = 'kicked_user';
const KICKED_BY_VOITING = 'kicked by voting';

module.exports = { DEFAULT_PORT, STATUS_CODE, KICKED_ID, KICKED_BY_VOITING };
