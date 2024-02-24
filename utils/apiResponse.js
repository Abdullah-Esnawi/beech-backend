// @desc    this class is responsible about operation errors (errors that i can predict)
class ApiResponse {
  constructor(status, message, statusCode, data, token) {
    this.statusCode = statusCode;
    this.message = message;
    this.status = status; //`${statusCode}`.startsWith(4) ? "fail" : "error";
    this.isOperational = true;
    this.data = data;
    this.token = token;
  }
}

module.exports = ApiResponse;
