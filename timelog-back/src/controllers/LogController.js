import Log from '../services/Log';
import Auth from '../services/Auth';

class LogController {
  static async getAllLogs(req, res) {
    const filters = req.query;
    try {
      const user = await Auth.getUserById(req.userId);
      if (user.role !== 'ADMIN') {
        throw new Error('Unauthorized');
      }
      const logs = await Log.getAllLogs(filters);
      res.status(200).json(logs);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getLogsByAuthor(req, res) {
    try {
      const user = await Auth.getUserById(req.userId);
      const logs = await Log.getLogsByAuthor(user.userName);
      res.status(200).json(logs);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async createLog(req, res) {
    const log = {
      author: req.body.author,
      project: req.body.project,
      rd: req.body.rd,
      date: req.body.date,
      month: req.body.month,
      year: req.body.year,
      time: req.body.time,
      notes: req.body.notes,
    };
    try {
      const newLog = await Log.createLog(log);
      res.status(201).json(newLog);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getLogById(req, res) {
    try {
      const log = await Log.getLogById(req.params.id);
      res.status(200).json(log);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async updateLog(req, res) {
    try {
      const log = {
        author: req.body.author,
        project: req.body.project,
        rd: req.body.rd,
        date: req.body.date,
        month: req.body.month,
        year: req.body.year,
        time: req.body.time,
        notes: req.body.notes,
      };
      const updatedLog = await Log.updateLog(req.params.id, log);
      res.status(200).json(updatedLog);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async deleteLog(req, res) {
    try {
      const deletedLog = await Log.deleteLog(req.params.id);
      res.status(200).json(deletedLog);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default LogController;
