SELECT id, employees.first_name, employees.last_name, roles.title, departments.departments_name, roles.salary, CONCAT(managers.first_name, ' ', managers.last_name) AS manager_name
FROM employees
JOIN roles ON roles.roles_id = employees.roles_id
JOIN departments ON roles.departments_id = departments.departments_id
LEFT JOIN managers ON managers.managers_id = employees.managers_id
ORDER BY id ASC;

SELECT * FROM departments

SELECT roles_id, title, departments.departments_name, salary
FROM roles
JOIN departments ON departments.departments_id = roles.departments_id;

INSERT INTO departments (departments_name)
VALUES
('Test');
SELECT CONCAT(departments_id, ' ', departments_name) AS Department FROM departments;
 
SELECT CONCAT(managers_id, ' ', first_name, ' ', last_name) AS managers FROM managers;