CREATE DATABASE `data_warehouse`;
USE `data_warehouse`;
-- TABLA USUARIOS CORRECTA PARA DATA WAREHOUSE
CREATE TABLE `users`(
    `user_id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `name` varchar(30) NOT NULL,
    `surname` varchar(30) NOT NULL,
    `mail` varchar(200) NOT NULL UNIQUE,
    `pass` varchar(18) NOT NULL,
    `admin` tinyint(1) NOT NULL,
    `phone` int NOT NULL,
    `active`   tinyint(1) NOT NULL

)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `regions`(
    `region_id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `region_name` varchar(30) NOT NULL,
    `active`   tinyint(1) NOT NULL
    )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `countries`(
    `country_id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `country_name` varchar(30) NOT NULL,
    `region_id` int NOT NULL,
    `active`   tinyint(1) NOT NULL,
    FOREIGN KEY (region_id)  REFERENCES regions(region_id)
    )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `cities`(
    `city_id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `city_name` varchar(30) NOT NULL,
    `country_id` INT NOT NULL,
    `active`   tinyint(1) NOT NULL,
    FOREIGN KEY (country_id)  REFERENCES countries(country_id)
    )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `companies`(
    `company_id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `company_name` varchar(30) NOT NULL,
    `company_address` varchar(50) NOT NULL,
    `mail` varchar(30) NOT NULL,
    `phone` int NOT NULL,
    `city_id` int NOT NULL,
    `active`   tinyint(1) NOT NULL,
    FOREIGN KEY (city_id)  REFERENCES cities(city_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE TABLE `contacts`(
    `contact_id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `name` varchar(30) NOT NULL,
    `surname` varchar(30) NOT NULL,
    `position` varchar(50) NOT NULL,
    `mail` varchar(50) NOT NULL,
    `interest` varchar(100) NOT NULL,
    `company_id` int NOT NULL,
    `city_id` int NOT NULL,
    `user_id` int NOT NULL,
    `active`   tinyint(1) NOT NULL,
    FOREIGN KEY (company_id)  REFERENCES companies(company_id),
    FOREIGN KEY (city_id) REFERENCES cities(city_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `changes`{
    `change_id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `modified_date` datetime DEFAULT(getdate()),
    `modified_by` varchar(30) NOT NULL,
    `modified_table` varchar(30) NOT NULL,
    `modified_id`int NOT NULL
}

INSERT INTO users (name, surname, mail, admin, phone, active, pass) VALUES ('moreno', 'preto', 'moreno.preto@live.com', 1, 1165478821, 1, 123456);
INSERT INTO users (name, surname, mail, admin, phone, active, pass) VALUES ('Gaspar', 'Aragon', 'gaspar.aragon@live.com', 1, 123123123, 1, 012345);
INSERT INTO regions (region_name,active) VALUES ('Am. del norte',1);
INSERT INTO regions (region_name,active) VALUES ('Am. del sur',1);
INSERT INTO regions (region_name,active) VALUES ('CentroAmerica',1);
INSERT INTO countries (country_name,region_id,active) VALUES ('Argentina',2,1);
INSERT INTO countries (country_name,region_id,active) VALUES ('Brasil',2,1);
INSERT INTO countries (country_name,region_id,active) VALUES ('Chile',2,1);
INSERT INTO countries (country_name,region_id,active) VALUES ('Mexico',1,1);
INSERT INTO countries (country_name,region_id,active) VALUES ('Canada',1,1);
INSERT INTO countries (country_name,region_id,active) VALUES ('Panama',3,1);
INSERT INTO countries (country_name,region_id,active) VALUES ('Costa Rica',3,1);
INSERT INTO cities (city_name,country_id,active) VALUES ('Bs. As.',1,1);
INSERT INTO cities (city_name,country_id,active) VALUES ('Cordoba',1,1);
INSERT INTO cities (city_name,country_id,active) VALUES ('Sao Paulo',2,1);
INSERT INTO cities (city_name,country_id,active) VALUES ('Santiago',3,1);
INSERT INTO cities (city_name,country_id,active) VALUES ('Mexico D.F',4,1);
INSERT INTO cities (city_name,country_id,active) VALUES ('Alberta',5,1);
INSERT INTO cities (city_name,country_id,active) VALUES ('Panama City',6,1);
INSERT INTO cities (city_name,country_id,active) VALUES ('San Jose',7,1);
INSERT INTO companies (company_name,company_address,mail,phone,city_id,active) VALUES ('Plus Cargo','Av. Siempre viva 123','plus@cargo.com',1122334455,5,1);
INSERT INTO companies (company_name,company_address,mail,phone,city_id,active) VALUES ('Del Beagle','De los nires 3038','del@beagle.com',5544336677,1,1);
INSERT INTO contacts (name ,surname ,position ,mail ,interest ,company_id ,city_id ,user_id ,active) VALUES ('Lucas', 'Barria', 'CEO','lucas.barria@live.com','None',1,1,1,1);
INSERT INTO contacts (name ,surname ,position ,mail ,interest ,company_id ,city_id ,user_id ,active) VALUES ('Jose', 'Romero victoria', 'CEO','jrm@live.com','None',1,5,1,1);
INSERT INTO contacts (name ,surname ,position ,mail ,interest ,company_id ,city_id ,user_id ,active) VALUES ('Juan', 'Vazquez', 'CEO','vazqjuan@live.com','None',2,1,1,1);
INSERT INTO contacts (name ,surname ,position ,mail ,interest ,company_id ,city_id ,user_id ,active) VALUES ('inaki', 'Igarreta', 'CFO','igarro@live.com','None',2,1,2,1);
INSERT INTO contacts (name ,surname ,position ,mail ,interest ,company_id ,city_id ,user_id ,active) VALUES ('Mateo', 'Del Mastro', 'Sales Executive','el.macho@live.com','None',2,1,2,1);


SELECT contacts.name, contacts.surname, contacts.position, contacts.mail, contacts.interest, cities.city_name, countries.country_name, regions.region_name, companies.company_name FROM contacts INNER JOIN cities ON contacts.city_id = cities.city_id INNER JOIN countries ON countries.country_id = cities.country_id  INNER JOIN regions ON countries.region_id = regions.region_id INNER JOIN companies ON companies.company_id = contacts.company_id WHERE contacts.active = 1 and user_id = ?


