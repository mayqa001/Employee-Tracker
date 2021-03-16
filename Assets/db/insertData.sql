INSERT INTO 
	department(name)
VALUES
	('Sales'),('Engineering'),('Finance'),('Legal');

INSERT INTO 
	roles(title, salary, dept_id)
VALUES
	('Sales lead','2000', (SELECT deptID FROM department WHERE deptID = 1)),
    ('Saleperson','1000', (SELECT deptID FROM department WHERE deptID = 1)),
	('Lead Enginner','3000', (SELECT deptID FROM department WHERE deptID = 2)),
	('Account Enginner','2000', (SELECT deptID FROM department WHERE deptID = 2)),
    ('Account Manager','3000', (SELECT deptID FROM department WHERE deptID = 2)),
	('Accountant ','1000', (SELECT deptID FROM department WHERE deptID = 3)),
	('Legal Team Lead ','2000', (SELECT deptID FROM department WHERE deptID = 4));

--dummy data
INSERT INTO employees VALUES('2', "andy", "ma", (SELECT roleID FROM roles as temp ), (SELECT empId FROM employees as y where empId = 1));
INSERT INTO employees VALUES('3', "jack", "ma", (SELECT roleID FROM roles as temp where roleID = "2"), (SELECT empId FROM employees as y where empId = 5));