const DBService = require('./DbService');

class DepartmentService {
  async getAll() {
    let dbService = new DBService();
    await dbService.createConnection();
    let query = 'SELECT * FROM departments';
    let queryParams = [];
    let result = await dbService.execute(query, queryParams);
    await dbService.closeConnection();
    return result;
  }

  async getById(id) {
    let dbService = new DBService();
    await dbService.createConnection();
    let query = 'SELECT * FROM departments WHERE departments.id=?';
    let queryParams = [id];
    let result = await dbService.execute(query, queryParams);
    await dbService.closeConnection();
    return result;
  }

  async create(data) {
    let dbService = new DBService();
    let departmentName = data.name;
    let departmentDescription = data.description;
    await dbService.createConnection();
    let query = 'INSERT INTO departments (name, description) values(?,?)';
    let queryParams = [departmentName, departmentDescription];
    let result = await dbService.execute(query, queryParams);
    await dbService.closeConnection();
    return result;
  }

  async update(id, data) {
    let dbService = new DBService();
    let departmentName = data.name;
    let departmentDescription = data.description;
    await dbService.createConnection();
    let query = 'UPDATE departments SET departments.name=?, departments.description=? WHERE departments.id=?';
    let queryParams = [departmentName, departmentDescription,id ];
    let result = await dbService.execute(query, queryParams);
    await dbService.closeConnection();
    return result;
  }

  async delete(id) {
    let dbService = new DBService();
    await dbService.createConnection();
    let query = 'DELETE FROM departments WHERE departments.id=?';
    let queryParams = [id];
    let result = await dbService.execute(query, queryParams);
    await dbService.closeConnection();
    return result;
  }
}

module.exports = DepartmentService;