import Auth from '../services/Auth';

class AuthController {
  static async createUser(req, res) {
    const user = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      role: req.body.role
    };
    try {
      const newUser = await Auth.createUser(user);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(err.statusCode).json(err.message);
    }
  }

  static async login(req, res) {
    try {
      const user = await Auth.login(req.body.email, req.body.password);
      res.status(200).json(user);
    } catch (err) {
      res.status(err.statusCode);
    }
  }

  static async getUser(req, res) {
    try {
      const user = await Auth.getUser(req.body.email);
      res.status(200).json(user);
    } catch (err) {
      res.status(err.statusCode);
    }
  }

  static async refreshToken(req, res) {
    const { refresh } = req.body;
    try {
      const token = await Auth.refreshToken(refresh);
      res.status(200).json(token);
    } catch (err) {
      res.status(err.statusCode);
    }
  }

  static async logout(req, res) {
    const { token } = req.body;
    try {
      const loggedOut = await Auth.logout(token);
      res.status(200).json({ message: loggedOut });
    } catch (err) {
      res.status(err.statusCode);
    }
  }

  static async changePassword(req, res) {
    const { token, oldPassword, newPassword } = req.body;
    try {
      const changedPassword = await Auth.changePassword(token, oldPassword, newPassword);
      res.status(200).json(changedPassword);
    } catch (err) {
      res.status(err.statusCode);
    }
  }
}

export default AuthController;
