import express from 'express';
import LogController from '../controllers/LogController';
import ExportController from '../controllers/ExportController';
import ChartController from '../controllers/ChartController';
import isAuth from '../middleware/is-auth';

const router = express.Router();

router
  // Crud for logs - User
  .get('/logs', isAuth, LogController.getLogsByAuthor)
  .post('/logs', isAuth, LogController.createLog)
  .put('/logs/:id', isAuth, LogController.updateLog)
  .delete('/logs/:id', isAuth, LogController.deleteLog)
  .get('/logs/export', isAuth, ExportController.exportAuthorLogs)
  .get('/logs/charts', isAuth, ChartController.getUserChart)
  // Admin routes
  .get('/admin/logs', isAuth, LogController.getAllLogs)
  .get('/admin/export', isAuth, ExportController.exportAllLogs)
  .get('/admin/charts', isAuth, ChartController.getAdminChart)

export { router as logsRouter };
