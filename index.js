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

db.connect(err => {
    if(err) throw err;
    promptMenu();
});

//first prompt to see what the user would like todo
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
        viewAllDepartments();
        break;
      case "View All Roles":
        viewAllRoles();
        break;
      case "View All Employees":
        viewAllEmployees();
        break;
      case "Add a Department":
        addNewDepartment();
        break;
      case "Add a Role":
        addNewRole();
        break;
      case "Add an Employee":
        addNewEmployee();
        break;
      case "Update an Employee Role":
        updateEmployeeRole();
        break;
      case "Finished":
        promptFinish();
    }
  });
};
//to view all employees
function viewAllEmployees(){
  let sql = `SELECT * FROM employee`;
  db.query(sql, (error, results) => {
  if(results) {
      return console.table(results);
      }
    else {
      return console.error(error.message);
    }
  
  });
  promptMenu();
}
//to view all departments
function viewAllDepartments(){
  let sql = `SELECT * FROM department`;
  db.query(sql, (error, results) => {
    if(results) {
      return console.table(results);
    }
    else {
      return console.error(error.message);
    }
  });
  promptMenu();
}
//to veiw all roles
function viewAllRoles(){
  let sql = `SELECT * FROM role`;
  db.query(sql, (error, results) => {
    if(results) {
      return console.table(results);
    }
    else {
      return console.error(error.message);
    }
  });
  promptMenu();
}
//to add a department 
// function addDepartment() {
//       inquirer.prompt([
//           {
//               type: "input",
//               name: "newDepartment",
//               message: "What is the name of the department you would like to add?"
//           }
//       ])
  
//   .then((answer) => {
//   let sql = INSERT INTO department (name)
//    VALUES (id,?);
  
//   db.query(sql, answer.departmentName, (error, response) => {
//       if (error) 
//           return console.error(error.message);
//       console.log(answer.departmentName + `Department successfully created!`);
//     });
//   })
// };

//adding a new department to the company
const addNewDepartment = () => {
    inquirer
      .prompt([
        {
          name: "newDepartment",
          type: "input",
          message: "What is the name of the new Department?"
        }
      ])
      .then((answer) => {
        let sql = `INSERT INTO department (name) VALUES (?)`;
        db.query(sql, answer.newDepartment, (error, response) => {
          if (error) throw error;
          console.log(answer.newDepartment + `Department successfully created!`);
        });
      });
    promptMenu();
};

//adding a role to the company
const addNewRole = () => { //check to see if this works in morning
  inquirer
    .prompt([
      {
        name: "newRole",
        type: "input",
        message: "What is the name of the new role in the company?"
      },
      {
        name: "newRole",
        type: "input",
        message: "What is the salary of this new role?"
      },
      {
        name: "newRole",
        type: "input",
        message: "What is the department_id of the new role?"
      }
    ])
    .then((answer) => {
      let sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
      db.query(sql, answer.newRole, (error, response) => {
        if (error) throw error;
        console.log(answer.newRole + `New Role successfully created!`);
      });
    });
  promptMenu();
};


// const addNewDepartment = [
//   { 
//     type: "input",
//     name: "newDepartment",
//     message: "What is the name of the department you would like to add?"
//   }
// ]

// const addNewRole = [
//   {
//     type: "input",
//     name: "newRole",
//     message: "What is the name of the new role you would like to add?"
//   }
// ]

// const addNewEmployee = [
//   {
//     type: "input",
//     name: "first_name",
//     message: "What is the first name of the employee?"
//   },
//   {
//     type: "input",
//     name: "last_name",
//     message: "What is the last name of the employee?"
//   },
//   {
//     type: "input",
//     name: "role_id",
//     message: "What role does this employee have in the company?"
//   },
//   {
//     type: "confirm",
//     name: "choice",
//     message: "Is this employee a manager?",
//     Choice: ["Yes", "No"]
//   }
// ]

////////////////////////////////
// const connection = require('../db/connection');
// const inquirer = require('inquirer');

// const addDepartment= () => {

// module.exports = addDepartment;

/////////////////////

// }

// module.exports = viewEmployees;

//const viewAllDepartments = () => {
//   sql.query("SELECT")
// }
// const promptDepartments = () => {
//   return inquirer.prompt
// }

//connection.connect(err => {
//     if(err) throw err;
//     promptMenu();
// });

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






// connection.connect(err => {
//     if(err) throw err;
//     promptMenu();
// });

// function start(){
// };

