let Emc = require("./Emc");
let questions = require("./questions");

let emc = new Emc("localhost", "root", "zm650701", "employee_db");
let connectionStatus = emc.emcConnect();

async function main() {
  if (connectionStatus === true) {
    let choice = await questions.callStartQuesion();

    if (choice === "View All Employees") {
      await emc.returnEmployeesName();
      await emc.viewAllEmployees();
      main();
    } else if (choice === "View all Employees by Department") {
      await emc.viewAllEmpByDep();
      main();
    } else if (choice === "View all Employees by manager") {
      console.log("heelp");
      await emc.returnEmployeesName();
      await emc.ViewAllEmpByManager();
      main();
    } else if (choice === "Add Employees") {
      await emc.returnEmployeesName();
      let nameArray = emc.getAllEmployeesName();
      nameArray.push("Null");
      let answers = await questions.callNewEmployQuestions(nameArray);
      let roleID = emc.getRolePK(answers.role);
      let mangerID = emc.getPK(answers.manager);
      await emc.addEmployee(answers.first_name, answers.last_name, roleID, mangerID);
      main();
    } else if (choice === "Remove Employees") {
      await emc.returnEmployeesName();
      let nameArray = emc.getAllEmployeesName();
      let promises = await questions.litsEmployees(nameArray);
      let id = emc.getPK(promises.employee);
      await emc.rmEmployees(id);
      main();
    } else if (choice === "Update Employee Role") {
      await emc.returnEmployeesName();
      let nameArray = emc.getAllEmployeesName();
      let promisesEmp = await questions.litsEmployees(nameArray);
      let promisesRole = await questions.callUpdateRoleQuestions();
      let id = emc.getPK(promisesEmp.employee);
      let roleID = emc.getRolePK(promisesRole.role);
      await emc.updateEmployeeRole(id,roleID);
      main();
    } else if (choice === "Update Employee Manager") {
      await emc.returnEmployeesName();
      let nameArray = emc.getAllEmployeesName();
      let promisesEmp = await questions.litsEmployees(nameArray);
      let promisesEmpManager = await questions.litsEmployees(nameArray);
      let empid = emc.getPK(promisesEmp.employee);
      let managerId = emc.getPK(promisesEmpManager.employee);
      await emc.updateEmpManager(managerId,empid);
      main();
    } else if (choice === "Quit") {
      emc.connection.end();
    }
  }
}

main();
