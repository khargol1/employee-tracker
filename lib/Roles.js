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

class Roles {
    constructor(){

    }

    viewAll(){
        connection.query(`SELECT roles_id, title, departments.departments_name, salary
        FROM roles
        JOIN departments ON departments.departments_id = roles.departments_id;`, function (err, res){
            if (err) throw err;
            console.log('');
            console.table(res);
        });

        
    }

    addRole(name, salary, department){
        
        connection.query(`INSERT INTO roles (title, salary, departments_id)
        VALUES
        ('${name}', '${salary}', '${department}');`, function(err, res){
            if(err) throw err;
            console.log('');
        });
        
    }
}

module.exports = Roles;