const createResponse = (h, status, message = '', data = null, code = 200) => {
  const response = {
    status,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  const httpResponse = h.response(response);
  httpResponse.code(code);

  return httpResponse;
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
