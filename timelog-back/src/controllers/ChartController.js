import Log from '../services/Log';
import Chart from '../services/Chart';
import Auth from '../services/Auth';
class ChartController {
  static async getAdminChart(req, res) {
    const type = req.query.type;
    const filters = {
      month: req.query.month,
    }
    let data;
    try {
      const logs = await Log.getLogs(filters);
      if (type === 'detailed') {
        data = Chart.getTimePerAuthor(logs);
      }

      if (type === 'global') {
        data = Chart.getTimePerProject(logs);
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getUserChart(req, res) {
    try {
      const user = await Auth.getUserById(req.userId);
      const logs = await Log.getMonthlyLogsByAuthor(user.userName);
      const data = Chart.getUserTime(logs);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default ChartController;
