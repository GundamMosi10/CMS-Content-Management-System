INSERT INTO department (name) 
VALUES ("HR"), ("Web Developement"), ("Marketing"), ("Finance"), ("Sales")

INSERT INTO role (title, salary, department_id)
VALUES ("HR Representative", 50000, 1), ("Senior Developer", 95000, 2), ("Marketing Strategist", 70000, 3), ("Junior Developer", 75000, 4), ("Sales Representative", 60000, 5)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ben", "Clarkson", 1, NULL), ("Kayle", "Lawrence", 2, 1), ("John", "Smith", 3, NULL), ("Devin", "Parker", 4, NULL), ("Clark", "Kent", 5, NULL), 

