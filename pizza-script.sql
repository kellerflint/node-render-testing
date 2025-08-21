-- PostgreSQL version for Render deployment
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    fname VARCHAR(255),
    lname VARCHAR(255),
    email VARCHAR(255),
    size VARCHAR(20),
    method VARCHAR(20),
    toppings VARCHAR(255),
    "timestamp" TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO orders (fname, lname, email, size, method, toppings)
VALUES ('Joe', 'Shmo', 'jshmo@gmail.com', 'small', 'pickup', 'olives, mushrooms');

/* MariaDB version (commented out)
create database pizza;
use pizza;

drop table if exists orders;
create table orders(
	id int(5) auto_increment primary key,
    fname varchar(255),
    lname varchar(255), 
    email varchar(255),
    size varchar(20),
    method varchar(20),
    toppings varchar(255),
    timestamp datetime default now()
);

insert into orders (fname, lname, email, size, method, toppings)
values ('Joe', 'Shmo', 'jshmo@gmail.com', 'small', 'pickup', 'olives, mushrooms');
*/