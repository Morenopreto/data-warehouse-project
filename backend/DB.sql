CREATE DATABASE d-warehouse;
USE d-warehouse;
-- TABLA USUARIOS CORRECTA PARA DATA WAREHOUSE
CREATE TABLE usuarios(
    user_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    fullName varchar(30) NOT NULL,
    mail varchar(30) NOT NULL UNIQUE,
    -- direccion varchar(50) NOT NULL,
    admin int(2) NOT NULL,
    phone int NOT NULL,
    username varchar(30) NOT NULL,
    pass varchar(30) NOT NULL
);


-- tablas regions, countries & cities Correctas para data warehouse
CREATE TABLE regions(
    region_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    region_name varchar(30) NOT NULL
    );

CREATE TABLE countries( 
    countrie_id INT NOT NULL,
    countrie_name varchar(30) NOT NULL,
    FOREIGN KEY (region_id)  REFERENCES regions(region_id)
     
);


CREATE TABLE cities( 
    city_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    city_name varchar(30) NOT NULL,
    FOREIGN KEY (countrie_id)  REFERENCES countries(countrie_id)

);

--tabla companias correcta
CREATE TABLE companies(
    company_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    company_name varchar(30) NOT NULL,
    company_address varchar(50) NOT NULL,
    mail varchar(30) NOT NULL,
    phone int NOT NULL,
    FOREIGN KEY (city_id)  REFERENCES cities(city_id)
    
    
);
-- HASTA ACA INFO CORRECTA PARA DATA WAREHOUSE


CREATE TABLE contacts( 
    contact_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    position varchar(20) NOT NULL,
    fullName varchar(30) NOT NULL,
    FOREIGN KEY (company_id)  REFERENCES companies(company_id),
    FOREIGN KEY (city_id) REFERENCES cities(city_id)


);
INSERT INTO `usuarios` (nombrecompleto, mail, direccion,telefono,usuario,contrasena,administrador) VALUES ('Administrador', 'admin@live.com', 'av. Siempre viva 123',1512345678,'admin','admin', 1);

INSERT INTO `estados` (estado_pedido) VALUES ('nuevo');
INSERT INTO `estados` (estado_pedido) VALUES ('confirmado');
INSERT INTO `estados` (estado_pedido) VALUES ('preparando');
INSERT INTO `estados` (estado_pedido) VALUES ('enviado');
INSERT INTO `estados` (estado_pedido) VALUES ('entregado');
INSERT INTO `estados` (estado_pedido) VALUES ('eliminado');

-- CREACION DE PRODUCTOS PARA PRUEBA DE ENDOPOINTS
INSERT INTO `productos` (nombre_producto, descripcion, precio ,Img_url,active) VALUES ('Chesseburger', 'hamburguesa simple con cheddar', 250 ,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2019%2F09%2FCheeseburger-Cheeseburger-Deals-FT-Blog0919.jpg', 1);
INSERT INTO `productos` (nombre_producto, descripcion, precio ,Img_url,active) VALUES ('Doble Chesseburger', 'hamburguesa doble con cheddar', 350 ,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2019%2F09%2FCheeseburger-Cheeseburger-Deals-FT-Blog0919.jpg', 1);
INSERT INTO `productos` (nombre_producto, descripcion, precio ,Img_url,active) VALUES ('Ensalada', 'Ensalada pollo grille, repollo, lechuga y tomate  ', 350 ,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2019%2F09%2FCheeseburger-Cheeseburger-Deals-FT-Blog0919.jpg', 1);


