DROP DATABASE IF EXISTS klinik;
CREATE DATABASE klinik;

USE klinik;

DROP TABLE IF EXISTS assets;

CREATE TABLE IF NOT EXISTS asset ( id int(10) NOT NULL,
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

CREATE TABLE IF NOT EXISTS user ( email varchar(50) NOT NULL,
								username varchar(50) NOT NULL,
								password varchar(64) NOT NULL,
								role varchar(10) NOT NULL,
								PRIMARY KEY (email)
								);

INSERT INTO asset(id, name, brand, spec, quantity, price) VALUES(1, 'Test', 'brand test', 'spec test', 1, 1000);