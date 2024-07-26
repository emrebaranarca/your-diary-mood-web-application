const httpStatus = require('http-status');

const validateSchema = (schema) => {
  return function verify(req, res, next) {
    const { value, error } = schema.validate(req.body);
    if (error) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: error.details[0].message
      });
    }
    Object.assign(req, value);
    return next();
  };
};

module.exports = validateSchema;
