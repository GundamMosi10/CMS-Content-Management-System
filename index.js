require('dotenv').config()
const fs = require('fs'); //Filesystem
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

//create the connection to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    database: 'content_db',
    password: process.env.DB_PASS
  },
  console.log(`Connected to the content_db`)
);

const promptMenu = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "mainMenu",
      message: "What would you like to do?",
      choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Finished"]
    }
  ])
  .then(userChoices => {
    switch (userChoices.mainMenu) {
      case "View All Departments":
        promptDepartments();
        break;
      case "View All Roles":
        promptRoles();
        break;
      case "View All Employees":
        promptEmployees();
        break;
      case "Add a Department":
        promptNewDepartment();
        break;
      case "Add a Role":
        promptNewRole();
        break;
      case "Add an Employee":
        promptNewEmployee();
        break;
      case "Update an Employee Role":
        promptUpdateEmployeeRole();
        break;
      case "Finished":
        promptFinish();
    }
  });
};



promptMenu(); 


// const promptDepartments = () => {
//   return inquirer.prompt
// }



// const questions = [
//   {
//     name: "menu",
//     type: "list",
//     message: "What would you like to do?",
//     choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Finished"]
//   },
//   {
//     type: "list",
//     name: "department",
//     message: "Which department would you like to view?",
//     choices: ["HR", "Operations", "Marketing"]
//   },
//   {
//     type: "list",
//     name: "roles",
//     message: "which role would you like to view",
//     choices: [""]
//   }
// ]


// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role






// db.connect(err => {
//     if(err) throw err
//     start()
// });

// function start(){
// };

