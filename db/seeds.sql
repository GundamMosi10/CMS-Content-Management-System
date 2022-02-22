INSERT INTO department (name) 
VALUES ("HR"), ("Operations"), ("Marketing")

INSERT INTO role (title, salary, department_id)
VALUES ("HR Representative", 50000, 1), ("Engineer", 75000, 2), ("Senior Developer", 95000, 3)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ben", "Clarkson", 1, NULL), ("John", "Smith", 2, NULL), ("Kayle", "Lawrence", 3, NULL)