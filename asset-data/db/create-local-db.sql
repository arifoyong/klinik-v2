-- Local database definition.

DROP DATABASE IF EXISTS local_db;
CREATE DATABASE local_db;
USE local_db;

DROP TABLE IF EXISTS asset;
CREATE TABLE asset (
  id int(10) NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  brand varchar(50) NOT NULL,
  spec varchar(50) NOT NULL,
  quantity int(10) NOT NULL,
  price float NOT NULL,
  delivery_cost float,
  delivery_date date,
  vendor varchar(50),
  website varchar(50),
  address varchar(200),
  contact varchar(50),
  phone varchar(20),
  img_uri varchar(500),
  PRIMARY KEY (id)
);

-- INSERT INTO books VALUES(1, 'Book 1');
-- INSERT INTO books VALUES(2, 'Book 2');