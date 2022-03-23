import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Token {
  static generateAccessToken(user) {
    return jwt.sign(
      {
        email: user.email,
        userId: user.id.toString(),
        role: user.role,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: '20m' }
    );
  }
  static generateRefreshToken(user) {
    return jwt.sign(
      {
        email: user.email,
        userId: user.id.toString(),
        role: user.role,
      },
      process.env.REFRESH_TOKEN
    );
  }
  static verifyAccessToken(token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN);
  }

  static verifyRefreshToken(token) {
    return jwt.verify(token, process.env.REFRESH_TOKEN);
  }
}

export default Token;
