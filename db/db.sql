CREATE DATABASE System;

CREATE TABLE System.users(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
    nombre VARCHAR (250) NOT NULL ,
    correo VARCHAR (250) NOT NULL ,
    password VARCHAR (250) NOT NULL 
);

CREATE TABLE System.documents(
    id_documents INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR (250) NOT NULL,
    url VARCHAR (250) NOT NULL,
    id_user INT NOT NULL ,FOREIGN KEY(id_user) REFERENCES users(id)
);
