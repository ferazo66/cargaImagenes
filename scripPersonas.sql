create database Personas;
use personas;

CREATE TABLE Propietario (
    Id_propietario INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(50) NOT NULL,
    fecha DATETIME NOT NULL,
    PRIMARY KEY (Id_propietario)
);
CREATE TABLE Imagenes (
    Id_imagenes INT NOT NULL AUTO_INCREMENT,
    direccion VARCHAR(50) NOT NULL,
    Id_propietario INT,
    estado BOOLEAN NOT NULL,
    PRIMARY KEY (Id_imagenes),
    FOREIGN KEY (Id_propietario)
        REFERENCES Propietario (Id_propietario)
);
INSERT INTO Propietario
values (1,"Enrique Erazo",15/12/2016);
INSERT INTO Propietario
values (2,"Mishell Rosero",15/12/2016);
INSERT INTO Imagenes
values (1,"homero.jpg",true,1);
INSERT INTO Imagenes
values (2,"perro.jpg",true,2);
INSERT INTO Imagenes
values (3,"homero.jpg",false,1);


