INSERT INTO departments (departments_name)
VALUES
    ('Sales'),
    ('Legal'),
    ('Human Resources'),
    ('Engineering')
    ;

INSERT INTO roles (title, salary, departments_id)
VALUES
    ('Lead Salesman', 32000, 1),
    ('Salesman', 43000, 1),
    ('Legal Aide', 39000, 2),
    ('HR Lead', 46000, 3),
    ('HR Assistant', 26000, 3),
    ('Lead Engineer', 72000, 4),
    ('Engineer', 49000, 4)
    ;

INSERT INTO managers (first_name, last_name)
VALUES
    ('Joshua', 'Smith'),
    ('Jennifer', 'Bailey'),
    ('Sarah', 'Burnam'),
    ('David', 'Harris')
    ;

INSERT INTO employees (first_name, last_name, roles_id, managers_id)
VALUES
    ('Joshua','Smith', 1, null),
    ('James','Acosta', 2, 1),
    ('Miles','Mishkin', 3, 2),
    ('Edward','Ballow', 2, 1),
    ('Sarah','Burnam', 3, null),
    ('David','Harris', 6, null),
    ('Michael','Parrot', 7, 1),
    ('Gabe','Stroh', 2, 1),
    ('Jennifer','Bailey', 4, null),
    ('Kristi','Brewster', 7, 1),
    ('Terri','Ramos', 5, 3),
    ('Heather','Owen', 7, 4),
    ('Kevin','Coman', 7, 4),
    ('Blake','Perry', 2, 1)
    ;