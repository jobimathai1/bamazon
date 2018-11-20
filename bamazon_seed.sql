DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price VARCHAR(45) NULL,
  stock_quantity INT,
  PRIMARY KEY (item_id)
);

create table departments (
department_id int not null auto_increment,
department_name varchar(45) null,
over_head_costs INT,
primary key (department_id)
);

ALTER TABLE products
ADD product_sales int;