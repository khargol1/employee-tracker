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

class Employees {
    constructor() {

    }

    addEmployee(fName, lName, role, manager) {
        connection.query(`INSERT INTO employees(first_name, last_name, roles_id, managers_id)
        VALUES
        ('${fName}', '${lName}', '${role}', '${manager}');`, function (err, res){
            if(err) console.log(err);
            console.log('')
        });
        
    }

    viewAll() {
        console.clear();

            const sql = `
            SELECT id, employees.first_name, employees.last_name, roles.title, departments.departments_name, roles.salary, CONCAT(managers.first_name, ' ', managers.last_name) AS manager_name
FROM employees
JOIN roles ON roles.roles_id = employees.roles_id
JOIN departments ON roles.departments_id = departments.departments_id
LEFT JOIN managers ON managers.managers_id = employees.managers_id
ORDER BY id ASC;
            `;

        connection.query(sql, function(err, res){
            if (err) throw err;
            console.log('');
            console.table(res);
        });
        
        
    }

    updateRole(id, role) {
        connection.query(`UPDATE employees SET roles_id = ${role} WHERE id = ${id};`, function(err, res){
            if(err) console.log(err);
        });
    }
}

module.exports = Employees;