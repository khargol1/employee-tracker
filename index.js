const Departments = require('./lib/Departments');
const Roles = require('./lib/Roles');
const Employee = require('./lib/Employee');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./db/employees.db');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'diggers',
    database: 'employees'
});

connection.connect(err => {
    if (err) throw err;
});

//tests
// const testDepartment = new Departments();
// const testRoles = new Roles();
// const testEmployee = new Employee();

// testDepartment.viewAll();
// testDepartment.addDepartment('testName');
// testRoles.viewAll();
// testRoles.addRole("testName", 10000);
// testEmployee.viewAll();
// testEmployee.addEmployee('first name', 'last name', 'role name/id', 'manager name');
// testEmployee.updateRole(1, 'role');

const department = new Departments();
const role = new Roles();
const employee = new Employee();

let departmentArr = [];
let managersArr = [];
let rolesArr = [];
let employeeArr = [];

function mainMenu() {
    console.log(`What would you like to do?`)

    return inquirer.prompt(
        {
            type: 'list',
            name: 'type',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee', 'Exit'],
            loop: false
        }
    ).then(choice => {

        switch (choice.type) {
            case 'Exit':
                console.log('goodbye');
                connection.end();
                process.exit(0);
                break;
            case 'View All Departments':
                department.viewAll();
                mainMenu();
                break;
            case 'View All Roles':
                role.viewAll();
                mainMenu();
                break;
            case 'View All Employees':
                employee.viewAll();
                mainMenu();
                break;
            case 'Add a Department':

                console.clear();
                return inquirer.prompt(
                    {
                        type: 'input',
                        name: 'department',
                        message: 'Please enter the name of the department to add.'
                    }
                ).then(data => {
                    connection.query(`INSERT INTO departments (departments_name) VALUES ('${data.department}');`, function(err, res){
                        if(err) throw (err);
                        console.log('');
                        getDepartments();
                        mainMenu();
                    });

                });

                break;
            case 'Add a Role':
                console.clear();

                return inquirer.prompt([{
                    type: 'input',
                    name: 'title',
                    message: 'What is the name of the job?',
                    default: 'Job'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary (Use whole numbers)',

                },
                {
                    type: 'list',
                    name: 'department',
                    choices: departmentArr,
                    loop: false
                }]).then(data => {

                    let title = data.title;
                    let salary = data.salary;
                    let [department] = data.department.split(' ');
                    let dprt = parseInt(department[0]);
                    connection.query(`INSERT INTO roles (title, salary, departments_id)
                    VALUES
                    ('${title}', '${salary}', '${dprt}');`, function(err, res){
                        if(err) throw err;
                        console.log('');
                        getRoles();
                        mainMenu();
                    });
                });
                break;
            case 'Add an Employee':
                //need to prompt
                
                return inquirer.prompt([
                    {
                        type: 'input',
                        name: 'fname',
                        meesage: 'What is the first name of the employee?'
                    },
                    {
                        type: 'input',
                        name: 'lname',
                        message: 'What is the last name of the employee?'
                    },
                    {
                        type: 'list',
                        name: 'role',
                        choices: rolesArr,
                        message: 'Please select employee role.',
                        loop: false
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        choices: managersArr,
                        message: 'Please select employee manager.',
                        loop: false
                    }]).then(data => {
                        let fName = data.fname;
                        let lName = data.lname;
                        let [roll_temp] = data.role.split(' ');
                        let role_id = parseInt(roll_temp[0]);
                        let [manage_temp] = data.manager.split(' ');
                        let manager = parseInt(manage_temp[0]);
                        connection.query(`INSERT INTO employees(first_name, last_name, roles_id, managers_id)
                        VALUES
                        ('${fName}', '${lName}', '${role_id}', '${manager}');`, function (err, res){
                            if(err) console.log(err);
                            console.log('')
                            getEmployees();
                            mainMenu();
                        });
                        

                    });

                break;
            case 'Update an Employee':
                //need to prompt
                return inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employee',
                        choices: employeeArr,
                        message: 'Choose an employee to update.'
                    },
                    {
                        type: 'list',
                        name: 'role',
                        choices: rolesArr,
                        message: 'Choose a role for the employee.'
                    }]).then(data => {
                        let [emp] = data.employee.split(' ');
                        let emp_id = parseInt(emp[0]);
                        let [rol] = data.role.split(' ');
                        let rol_id = parseInt(rol[0]);

                        employee.updateRole(emp_id, rol_id );
                        mainMenu();
                    })

                break;

            default:
                console.log('How did you even get to this?');
        } //end switch


    });//end call backs
}//end mainMenu

async function getDepartments() {
    departmentArr = [];
    connection.query(`SELECT CONCAT(departments_id, ' ', departments_name) AS department FROM departments;`, function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            departmentArr.push(res[i].department);
        }
    });

}

async function getEmployees() {
    employeeArr = [];
    connection.query(`SELECT CONCAT(id, ' ', first_name, ' ', last_name) AS employees from employees;`, function (err, res) {
        if (err) console.log;
        for (let i = 0; i < res.length; i++) {
            employeeArr.push(res[i].employees);
        }
    })

}

async function getManagers() {
    managersArr = [];
    connection.query(`SELECT CONCAT(managers_id, ' ', first_name, ' ', last_name) AS managers FROM managers;`, function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            managersArr.push(res[i].managers);
        }
    });
}

async function getRoles() {
    rolesArr = [];
    connection.query(`SELECT CONCAT(roles_id, ' ', title) AS role FROM roles`, function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            rolesArr.push(res[i].role);
        }
    })
}


async function onLoad() {

    await getDepartments();
    await getEmployees();
    await getManagers();
    await getRoles();
    mainMenu();

}
console.clear();
onLoad();


