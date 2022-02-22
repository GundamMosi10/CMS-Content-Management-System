INSERT INTO department (name) 
VALUES ("HR"), ("Operations"), ("Marketing")

INSERT INTO role (title, salary, department_id)
VALUES ("HR Representative", 50000, 1), ("Senior Developer", 95000, 2), ("Marketing Strategist", 70000, 3)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ben", "Clarkson", 1, NULL), ("Kayle", "Lawrence", 2, NULL), ("John", "Smith", 3, NULL)

