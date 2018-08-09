DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE market (
	id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INTEGER(50) NULL,
    PRIMARY KEY (id)
);

INSERT INTO market (product_name, department_name, price, stock_quantity)
VALUES ("God of War (PS4)", "Sony", 60, 20);

INSERT INTO market (product_name, department_name, price, stock_quantity)
VALUES ("Cool Meats", "No Jokes Please", 300, 99);

INSERT INTO market (product_name, department_name, price, stock_quantity)
VALUES ("1000 YuGiOh Cards", "Totally Konami", 30, 10);

INSERT INTO market (product_name, department_name, price, stock_quantity)
VALUES ("The Rider-Waite Tarot Deck", "US Games Systems Inc", 15, 99);

INSERT INTO market (product_name, department_name, price, stock_quantity)
VALUES ("Water", "Water World", 1500, 3);

INSERT INTO market (product_name, department_name, price, stock_quantity)
VALUES ("A Whole Pikachu Pocket Monster", "Nintemendono", 5, 3);

INSERT INTO market (product_name, department_name, price, stock_quantity)
VALUES ("Some batteries i found in my couch", "your dad", 40, 5);

INSERT INTO market (product_name, department_name, price, stock_quantity)
VALUES ("Chainsword", "DARPA", 30000, 2);

INSERT INTO market (product_name, department_name, price, stock_quantity)
VALUES ("Seven Flags Vacuum Tokens", "Satan", 47.99, 9999999);

INSERT INTO market (product_name, department_name, price, stock_quantity)
VALUES ("Luck And Fortune Pills", "Jeff Bezos", .99, 2948327);

