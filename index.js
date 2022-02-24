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
      choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Finished" ]
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
        finish();
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
          console.log(answer.newDepartment  +  `Department successfully created!`);
          promptMenu();
        });
      });
};

//adding a role to the company
const addNewRole = () => { 
  inquirer
    .prompt([
      {
        name: "newRole",
        type: "input",
        message: "What is the name of the new role in the company?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary of this new role?"
      },
      {
        name: "department_id",
        type: "input",
        message: "What is the department_id of the new role?"
      }
    ])
    .then((answer) => {
      let sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
      db.query(sql, [answer.newRole, answer.salary, answer.department_id], (error, response) => {
        if (error) throw error;
        console.log(answer.newRole  +  `New Role successfully created!`);
        promptMenu();
      });
    });
};
//this function adds a new employee to the company
const addNewEmployee = () => {
  inquirer
  .prompt([
    {
      name: "newEmployeeFirst",
      type: "input",
      message: "What is the first name of the employee?"
    },
    {
      name: "newEmployeeLast",
      type: "input",
      message: "What is the last name of the employee?"
    },
    {
      name: "role_id",
      type: "input",
      message: "What is the role_id of this new employee?"
    },
    {
      name: "manager_id",
      type: "list",
      message: "Who is this employee's Manager?",
      choices: [{name:"Ben", value:1}, {name:"Kayle", value:2}, {name:"John", value:3}, {name:"Peter", value:4}, {name: "Clark", value:5}]
    }
  ])
  .then((answer) => {
    let sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    db.query(sql, [answer.newEmployeeFirst, answer.newEmployeeLast, answer.role_id, answer.manager_id], (error, response) => {
      if (error) throw error;
        console.log(answer.newEmployeeFirst  +  `New Employee successfully created!`); 
        promptMenu();
    });
  });
};
//this updates an employee's role within the company 
const updateEmployeeRole = () => {
  inquirer
  .prompt([
    {
      name: "employeeUpdate",
      type: "list",
      message: "Which employee do you want to update role?",
      choices: [{name:"Ben", value:1}, {name:"Kayle", value:2}, {name:"John", value:3}, {name:"Peter", value:4}, {name: "Clark", value:5}]
    },
    {
      name: "role_id",
      type: "list",
      message: "What is the new role_id of this employee?",
      choices: [{name:"HR Representative", value:1}, {name:"Senior Developer", value:2}, {name:"Marketing Strategist", value:3}, {name: "Junior Developer", value:4}, {name:"Sales Representative", value:5}]
    }
  ])
  .then ((answer) => {
    let sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    db.query(sql, [answer.role_id, answer.employeeUpdate], (error, reponse) => {
      if (error) throw error;
      console.log(answer.employeeUpdate + `Updated existing employee role!`);
      promptMenu();
    });
  });
};
//closes the prompt in the command line
function finish() {
  process.exit(0);
};
