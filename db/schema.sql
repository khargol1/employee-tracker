DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS managers;
DROP TABLE IF EXISTS departments;



CREATE TABLE departments (
    departments_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    departments_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    roles_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    departments_id INT,
    FOREIGN KEY (departments_id) REFERENCES departments(departments_id) ON DELETE SET NULL 
);

CREATE TABLE managers (
    managers_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30)
);

CREATE TABLE employees (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    roles_id INTEGER,
    managers_id INTEGER,
    FOREIGN KEY (roles_id) REFERENCES roles(roles_id) ON DELETE SET NULL,
    FOREIGN KEY (managers_id) REFERENCES managers(managers_id) ON DELETE SET NULL 
);