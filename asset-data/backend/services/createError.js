const createError = ({statusCode=500, message='Something went wrong'}) => {
  let error = new Error(message)
  error.statusCode = statusCode
  return error
}

module.exports = {
  createError,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409,
  NOT_FOUND: 404,
  UNPROCESSABLE: 422,
  GENERIC_ERROR: 500
}