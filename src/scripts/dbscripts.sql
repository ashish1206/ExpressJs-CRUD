CREATE TABLE "employee"(
	emp_id SERIAL NOT null UNIQUE,
	emp_name CHAR(50) not null,
	email VARCHAR(50) NOT null UNIQUE,
	password VARCHAR(100) NOT NULL,
	phone_number VARCHAR(10) NOT NULL UNIQUE,
	manager_id INT,
	constraint emp_id_PK primary key ( emp_id ),
	constraint emp_manager_id_fk foreign key (manager_id)
	references "employee" (emp_id)
);