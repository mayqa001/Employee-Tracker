CREATE database employee_db;
Use employee_db;

CREATE TABLE employees(
	empId int PRIMARY KEY NOT NULL,
	first_Name varchar(30),
    last_Name varchar(30),
    role_id int,
    manager_id int,
    FOREIGN KEY (role_id) REFERENCES roles(roleID),
    FOREIGN KEY (manager_id) REFERENCES employees(empId)
);

CREATE TABLE department(
	deptID int PRIMARY KEY NOT NULL,
    name varchar(30)
);

CREATE TABLE roles(
	roleID INT PRIMARY KEY NOT NULL,
    title varchar(30),
    salary decimal,
    dept_id INT,
	FOREIGN KEY (dept_id) REFERENCES Department(deptID)
);

