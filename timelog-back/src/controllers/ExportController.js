import Log from '../services/Log';
import Auth from '../services/Auth';
import Export from '../services/Export';

class ExportController {
  static async exportAllLogs(req, res) {
    const filters = req.query;
    try {
      const user = await Auth.getUserById(req.userId);

      if (user.role !== 'ADMIN') {
        throw new Error('Unauthorized');
      }
      const logs = await Log.getAllLogs(filters);
      const csv = Export.exportAllLogs(logs);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-disposition', 'attachment; filename=all-logs.csv');
      res.status(200).send(csv);
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }
  static async exportAuthorLogs(req, res) {
    try {
      const user = await Auth.getUserById(req.userId);
      const logs = await Log.getLogsByAuthor(user.userName);
      const csv = Export.exportAuthorLogs(logs);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-disposition', 'attachment; filename=all-logs.csv');
      res.status(200).send(csv);
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }
}

export default ExportController;
