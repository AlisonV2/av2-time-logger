import LogModel from '../models/LogModel';
import getCurrentMonth from '../utils/getCurrentMonth';

class Log {
  static async getAllLogs(filters) {
    console.log(filters)
    let where = {};
    let limit = 10;
    let offset = 0;

    if (filters.page) {
      const page = filters.page;
      offset = (+page - 1) * limit;
    }

    if (filters.author) {
      where.author = filters.author;
    }

    if (filters.month) {
      where.month = filters.month;
    }

    if (filters.project) {
      where.project = filters.project;
    }

    if (filters.rd) {
      where.rd = filters.rd;
    }

    const isEmpty = Object.keys(where).length === 0;

    try {

      if (isEmpty) {
        return await LogModel.findAndCountAll({
          offset,
          limit,
          
        });
      }
      return await LogModel.findAndCountAll({
        offset,
        limit,
        where: {
          ...where,
        },
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async getLogs(filters) {
    const year = new Date().getFullYear().toString();
    const month = filters.month;
    try {
      if (!month) {
        return await LogModel.findAll({
          where: {
            year,
          }
        });
      }
      return await LogModel.findAll(
        {
          where: {
            year,
            month
          }
        }
      );
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async createLog(log) {
    try {
      return await LogModel.create(log);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async getLogById(id) {
    try {
      return await LogModel.findOne({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async getLogsByAuthor(author) {
    const year = new Date().getFullYear().toString();
    try {
      return await LogModel.findAll({
        where: {
          author,
          year
        },
        order: [['createdAt', 'DESC']],
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
  static async getMonthlyLogsByAuthor(author) {
    const year = new Date().getFullYear().toString();
    const month = getCurrentMonth();
    try {
      return await LogModel.findAll({
        where: {
          author,
          year,
          month,
        },
        order: [['createdAt', 'DESC']],
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async updateLog(id, log) {
    try {
      return await LogModel.update(log, {
        where: {
          id,
        },
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async deleteLog(id) {
    try {
      return await LogModel.destroy({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default Log;
