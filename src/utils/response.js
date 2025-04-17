const createResponse = (h, status, message = '', data = null, code = 200) => {
  const response = {status};

  if (message) response.message = message;
  if (data !== null) response.data = data;

  return h.response(response).code(code);
};

module.exports = {
  getSuccessResponseWithMessage: (h, message, status = 200) =>
    createResponse(h, 'success', message, null, status),

  getFailedResponseWithMessage: (h, message, status = 400) =>
    createResponse(h, 'fail', message, null, status),

  getSuccessResponseWithMsgAndData: (h, message, data, status = 200) =>
    createResponse(h, 'success', message, data, status),

  getSuccessResponseWithData: (h, data, status = 200) =>
    createResponse(h, 'success', '', data, status),
};
