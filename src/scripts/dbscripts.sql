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

CREATE TABLE "task_status"(
	status_id SERIAL NOT NULL UNIQUE,
	status_name CHAR(20) NOT NULL UNIQUE,
	status_des VARCHAR(50),
	constraint status_id_PK primary key ( status_id )
)

CREATE TABLE "task"(
	task_id SERIAL NOT null UNIQUE,
	description VARCHAR(100),
	create_date date NOT null,
	update_date date NOT NULL,
	status_id SERIAL NOT NULL,
	details VARCHAR(100),
	emp_id INT NOT NULL,
	constraint task_id_PK primary key ( task_id ),
	constraint status_id foreign key ( status_id )
	references "task_status" ( status_id ),
	constraint emp_id_fk foreign key (emp_id)
	references "employee" (emp_id)
);