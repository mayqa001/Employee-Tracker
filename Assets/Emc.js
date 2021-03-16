let mysql = require("mysql");
const cTable = require("console.table");
const Employee = require("./employees/employess");

class Emc {
  constructor(host, user, password, database) {
    this.connection = mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: database,
    });
    this.employees = [];
  }

  emcConnect() {
    this.connection.connect();
    if (this.connection.status === "disconnected") {
      return false;
    } else {
      return true;
    }
  }

  getAllEmployeesName() {
    let nameList = [];

    this.employees.forEach((element) => {
      let fullname = element.getFullName();
      nameList.push(fullname);
    });
    return nameList;
  }

  getPK(name) {
    let id;
    this.employees.forEach((element) => {
      if (name === element.getFullName()) {
        id = element.getId();
      }
    });
    return id;
  }

  getRolePK(name) {
    let pk;
    if (name === "Sales lead") {
      pk = 1;
    } else if (name === "Saleperson") {
      pk = 2;
    } else if (name === "Lead Enginner") {
      pk = 3;
    } else if (name === "Account Engineer") {
      pk = 4;
    } else if (name === "Account Manager") {
      pk = 5;
    } else if (name === "Accountant") {
      pk = 6;
    } else if (name === "Legal Team Lead") {
      pk = 7;
    }

    return pk;
  }

  returnEmployeesName() {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "SELECT first_name, last_name, empId FROM employees; ",
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            let temp = [];
            res.forEach((element) => {
              temp.push(
                new Employee(
                  element.first_name,
                  element.last_name,
                  element.empId
                )
              );
              this.employees = temp;
            });
            resolve();
          }
        }
      );
    });
  }

  viewAllEmployees() {
    return new Promise((resolve, reject) => {
      let query = `
      SELECT emp.empId, emp.first_Name,emp.last_Name, 
      roles.title, department.name, roles.salary,
      CONCAT(supv.first_Name, " ", supv.last_Name) AS managerName
      FROM employees emp
      LEFT OUTER JOIN roles ON emp.role_id = roles.roleID
      LEFT OUTER JOIN department ON roles.dept_id = department.deptID
      LEFT OUTER JOIN employees supv 
      on emp.manager_id = supv.empId ; `;
      this.connection.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          console.log("\n");
          if (res.length === 0) {
            console.log("Not employess in database");
          } else {
            console.table(res);
          }
          resolve();
        }
      });
    });
  }

  viewAllEmpByDep() {
    let query = `SELECT emp.first_name, emp.last_name, dep.name
    FROM employees as emp
    LEFT OUTER JOIN roles rol 
    on emp.role_id = rol.roleID 
    LEFT OUTER JOIN department dep 
    on dep.deptID = rol.dept_id 
    ORDER BY dep.deptID;`;
    return new Promise((resolve, reject) => {
      this.connection.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          console.log("\n");
          if (res.length === 0) {
            console.log("Not employess in database");
          } else {
            console.table(res);
          }
          resolve();
        }
      });
    });
  }

  ViewAllEmpByManager() {
    let query = `SELECT emp.first_name, emp.last_name, CONCAT(supv.first_Name, " ", supv.last_Name) as managerName
    FROM employees emp
    LEFT OUTER JOIN employees supv 
    on emp.manager_id = supv.empId 
    ORDER BY emp.manager_id;`;
    return new Promise((resolve, reject) => {
      this.connection.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          console.log("\n");
          if (res.length === 0) {
            console.log("Not employess in database");
          } else {
            console.table(res);
          }
          resolve();
        }
      });
    });
  }

  addEmployee(firstName, lastName, roleID, managerID) {
    return new Promise((resolve, reject) => {
      let query =
        "INSERT INTO employees (first_Name,last_Name,role_id,manager_id) VALUES (?, ?,  (SELECT roleID FROM roles as y where roleID = ?), (SELECT empId FROM employees as x where empId = ?))";
      this.connection.query(
        query,
        [firstName, lastName, roleID, managerID],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  rmEmployees(id) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `DELETE FROM employees WHERE empId = ${id}`,
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  updateEmployeeRole(employeeID, roleID) {
    return new Promise((resolve, reject) => {
      let query = "UPDATE employees SET role_id = ? WHERE empId = ?;";
      this.connection.query(query, [roleID, employeeID], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  updateEmpManager(managerID, employeeID) {
    return new Promise((resolve, reject) => {
      let query = "UPDATE employees SET manager_id = ? WHERE empId = ?;";
      this.connection.query(query, [managerID, employeeID], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = Emc;
