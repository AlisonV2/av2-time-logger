import { Parser } from 'json2csv';
class Export {
  static createCsv(logs, fields) {
    const json2csv = new Parser({ fields });
    return json2csv.parse(logs);
  }
  static exportAllLogs(logs) {
    const fields = ['author', 'project', 'rd', 'time', 'month', 'year', 'date'];
    return this.createCsv(logs, fields);
  }

  static exportAuthorLogs(logs) {
    const fields = ['project', 'rd', 'time', 'month', 'year', 'date'];
    return this.createCsv(logs, fields);
  }
}

export default Export;
