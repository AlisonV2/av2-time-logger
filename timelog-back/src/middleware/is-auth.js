import Token from '../services/Token';

const isAuth = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header.split(' ')[1];
  if (!token) {
    const error = new Error('Not authorized');
    error.statusCode = 401;
    throw error;
  }

  let decodedToken;

  try {
    decodedToken = Token.verifyAccessToken(token);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};

export default isAuth;
