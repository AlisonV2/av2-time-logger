import db from '../config/db';

class Database {
  static async setup() {
    try {
      await db.authenticate();
      await db.sync();
      console.log('Connection has been established successfully.');
    } catch (err) {
      console.error('Unable to connect to the database:', err);
    }
  }
}

export default Database;