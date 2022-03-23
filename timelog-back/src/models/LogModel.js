import { DataTypes } from 'sequelize';
import db from '../config/db';

const LogModel = db.define('log', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  project: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rd: {
    type: DataTypes.STRING,
    allowNull: true
  },
  author: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  month: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
});

export default LogModel;