require('dotenv').config()
const inquirer = require('inquirer');
const mysql = require('mysql2');


// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'content_db',
  password: process.env.DB_PASS
});

connection.connect(err => {
    if(err) throw err
    start()
})

function start(){

}