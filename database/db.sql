--creando db
CREATE DATABASE crudenodejsmysql;

--utlizando db
use crudenodejsmysql;

--creando tabla
CREATE TABLE  customer(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    telefono VARCHAR(15)
);

-- mostrar tabla
SHOW TABLES;

--describir la tabla
describe customer;