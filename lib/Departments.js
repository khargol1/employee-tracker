const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'diggers',
    database: 'employees'
});

class Departments {
    constructor(){

    }

    viewAll(){
        connection.query('SELECT * FROM departments', function(err, res){
            if (err) throw err;
            console.log('');
            console.table(res);
        });
        console.log('');
    }

    addDepartment(name){
        
        connection.query(`INSERT INTO departments (departments_name) VALUES ('${name}');`, function(err, res){
            if(err) throw (err);
            console.log('');
            
        });
    }
}


module.exports = Departments;