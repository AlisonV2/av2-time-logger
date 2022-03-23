import bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';
import Token from './Token';

class Auth {
  static async hashPassword(password) {
    return bcrypt.hash(password, 12);
  }
  static async getUser(email) {
    const user = await UserModel.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }

    return user.email;
  }

  static async getUserById(id) {
    const user = await UserModel.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      const error = new Error('A user with this id could not be found.');
      error.statusCode = 401;
      throw error;
    }

    return {
      userName: user.name,
      role: user.role,
      userId: user.id,
      email: user.email,
      token: user.token,
      password: user.password
    };
  }

  static async createUser(user) {
    const emailAlreadyUsed = await UserModel.findOne({
      where: {
        email: user.email,
      },
    });

    if (emailAlreadyUsed) {
      return 'A user with this email already exists.';
    }

    const email = user.email;
    const name = user.name;
    const password = user.password;
    const role = user.role;

    try {
      const hashed = await this.hashPassword(password);

      if (hashed) {
        const newUser = await UserModel.create({
          email,
          name,
          password: hashed,
          role,
        });

        return {
          email: newUser.email,
          name: newUser.name,
        };
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async login(email, password) {
    let user;
    try {
      user = await UserModel.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }

      const isEqual = bcrypt.compare(password, user.password);

      if (!isEqual) {
        const error = new Error('Wrong password');
        error.statusCode = 401;
        throw error;
      }

      const accessToken = Token.generateAccessToken(user);
      const refreshToken = Token.generateRefreshToken(user);

      await UserModel.update(
        {
          token: refreshToken,
        },
        {
          where: {
            id: user.id,
          },
        }
      );

      return {
        token: accessToken,
        refresh: refreshToken,
        userId: user.id,
        userName: user.name,
        role: user.role,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async logout(token) {
    try {
      const decoded = Token.verifyAccessToken(token);
      const user = await this.getUserById(decoded.userId);
      await UserModel.update(
        {
          token: null,
        },
        {
          where: {
            id: user.userId,
          },
        }
      );
      console.log('logged out');
      return 'Successfully logged out.';
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async refreshToken(token) {
    try {
      const refresh = await UserModel.findOne({
        where: {
          token,
        },
      });

      if (refresh.token !== token) {
        const error = new Error('Your token is invalid.');
        error.statusCode = 401;
        throw error;
      }

      const decoded = Token.verifyRefreshToken(token);
      const user = await this.getUserById(decoded.userId);
      const accessToken = Token.generateAccessToken({
        id: user.userId,
        email: user.email,
        role: user.role,
      });
      return {
        token: accessToken,
        refresh: token,
        userId: user.userId,
        userName: user.userName,
        role: user.role,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }
  static async changePassword(token, oldPassword, newPassword) {
    try {
      const refresh = await UserModel.findOne({
        where: {
          token,
        },
      });

      if (refresh.token !== token) {
        const error = new Error('Your token is invalid.');
        error.statusCode = 401;
        throw error;
      }

      const decoded = Token.verifyRefreshToken(token);
      const user = await this.getUserById(decoded.userId);
      const isEqual = bcrypt.compare(oldPassword, user.password);

      if (!isEqual) {
        const error = new Error('Wrong password');
        error.statusCode = 401;
        throw error;
      }

      const hashed = await this.hashPassword(newPassword);

      if (hashed) {
        await UserModel.update(
          {
            password: hashed,
          },
          {
            where: {
              id: user.userId,
            },
          }
        );
        return 'Password changed successfully.';
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default Auth;
