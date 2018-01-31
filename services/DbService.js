const mysql = require('mysql');

class DBService {
  constructor() {
    this.connectionInfo = {
      host: process.env.dbHost,
      user: process.env.dbUser,
      password: process.env.dbPassword,
      database: process.env.dbName,
      multipleStatements: true
    }
    this.connection = null;
  }

  createConnection() {
    return new Promise((resolve, reject) => {
      this.connection = mysql.createConnection(this.connectionInfo);
      resolve('success');
    });
  }

  execute(query, queryParams) {
    return new Promise((resolve, reject) => {
      this.connection.query(query, queryParams, (err, result) => {
        if (err) {
          reject('Problem with executing');
        }
        resolve(result);
      });
    });
  }

  closeConnection() {
    return new Promise((resolve, reject) => {
      this.connection.end();
      resolve('success');
    });
  }
}

module.exports = DBService;