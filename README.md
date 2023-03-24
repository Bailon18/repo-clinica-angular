# Proyecto de Historial Clínico Psicológico

Este es un proyecto de un historial clínico psicológico hecho con Angular, Java, Spring Boot y MySQL. El proyecto contiene los siguientes modulos:

- Usuarios ( usuarios del sistema)
  - Agregar , editar.
  - Permisos segun los roles
  - Bloquear usuarios
- Paciente ( clientes del sistema)
  - Agregar , editar, lista de pacientes,  filtro
  - Agregar , editar historial clinico

  [![pacientesss.jpg](https://i.postimg.cc/xjNYbzb8/pacientesss.jpg)](https://postimg.cc/grp1Crsb)
  
- Citas ( gestion de citas de los clientes )
  - 
  


## Requisitos

Node.js
Angular CLI
Java 11
Spring Boot 2.5.4
MySQL
Configuración
Base de datos
Cree una base de datos MySQL y ejecute el script SQL ubicado en /backend/src/main/resources/db.sql para crear la tabla patient y la tabla psychological_evaluation.

## Backend

Abra el proyecto en su IDE y actualice las credenciales de la base de datos en el archivo application.properties ubicado en /backend/src/main/resources/.
Compile y ejecute el proyecto. El backend se ejecutará en http://localhost:8080.

## Frontend
Abra una terminal en el directorio /frontend.
Ejecute npm install para instalar las dependencias.
Ejecute ng serve para compilar y ejecutar el proyecto de Angular. La aplicación se ejecutará en http://localhost:4200.

## Uso
Una vez que la aplicación esté en funcionamiento, los usuarios podrán registrarse e iniciar sesión. Después del inicio de sesión, podrán registrar sus datos psicológicos, ver su historial clínico y actualizar sus datos en cualquier momento.


