const createResponse = (h, status, message = '', data = null, code = 200) => {
  const response = h.response({
    status,
    message,
    data,
  });
  response.code(code);
  return response;
};

module.exports = {
  getSuccessResponseWithMessage: (h, message, status = 200) =>
    createResponse(h, 'success', message, null, status),

  getFailedResponseWithMessage: (h, message, status) =>
    createResponse(h, 'fail', message, null, status),

  getSuccessResponseWithMsgAndData: (h, message, data, status = 200) =>
    createResponse(h, 'success', message, data, status),

  getSuccessResponseWithData: (h, data, status = 200) =>
    createResponse(h, 'success', '', data, status),
};
