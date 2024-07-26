const { verifyToken } = require('../../scripts/utils/jwt/jwt');
const httpStatus=require('http-status')

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED)
    .json(
        { message: 'No token, authorization denied' }
    )
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED)
    .json(
        { message: 'Token is not valid' }
    )
  }
};

module.exports = authMiddleware;
