require('dotenv').config()
const fs = require('fs'); //Filesystem
const inquirer = require('inquirer');
const mysql = require('mysql2');

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

const menu = [
  {
    name: "menu",
    type: "list",
    message: "What would you like to do?",
    choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Finished"]
  }
]

// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role






db.connect(err => {
    if(err) throw err
    start()
});

function start(){
};

