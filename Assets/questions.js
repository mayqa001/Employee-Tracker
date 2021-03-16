var inquirer = require("inquirer");
let emc = require("./Emc");

const startChoices = [
  "View All Employees",
  "View all Employees by Department",
  "View all Employees by manager",
  "Add Employees",
  "Remove Employees",
  "Update Employee Role",
  "Update Employee Manager",
  "Quit",
];

const startQuestion = [
  {
    name: "start",
    message: "What would you like to do? ",
    type: "list",
    choices: startChoices,
    default: "View All Employees",
    loop: false,
  },
];

const roles = [
  "Sales lead",
  "Saleperson",
  "Lead Enginner",
  "Account Engineer",
  "Account Manager",
  "Accountant",
  "Legal Team Lead",
];

async function callStartQuesion() {
  try {
    const answers = await inquirer.prompt(startQuestion);
    return answers.start;
  } catch (e) {
    console.error(e);
  }
}

async function litsEmployees(employeesList) {
  //get fullname
  const employees = [
    {
      name: "employee",
      type: "list",
      choices: employeesList,
      loop: true,
    },
  ];
  try {
    const answers = await inquirer.prompt(employees);
    return answers;
  } catch (e) {
    console.error(e);
  }
}

async function callNewEmployQuestions(namearray) {
  const newEmployQuestions = [
    { name: "first_name", type: "input", message: "What is your first name?" },
    { name: "last_name", type: "input", message: "What is your last name?" },
    {
      name: "role",
      type: "list",
      choices: roles,
      message: "What is your role?",
    },
    {
      name: "manager",
      type: "list",
      choices: namearray,
      message: "Who is your mananger?",
    },
  ];
  try {
    const answers = await inquirer.prompt(newEmployQuestions);
    return answers;
  } catch (e) {
    console.error(e);
  }
}
async function callUpdateRoleQuestions() {
  const updateRoleQuestions = [
    {
      name: "role",
      type: "list",
      choices: roles,
      message: "Who is your new role?",
    },
  ];
  try {
    const answers = await inquirer.prompt(updateRoleQuestions);
    return answers;
  } catch (e) {
    console.error(e);
  }
}

exports.callStartQuesion = callStartQuesion;
exports.litsEmployees = litsEmployees;
exports.callNewEmployQuestions = callNewEmployQuestions;
exports.callUpdateRoleQuestions = callUpdateRoleQuestions;