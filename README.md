# Proyecto de Historial Clínico Psicológico

Este es un proyecto de un historial clínico psicológico hecho con Angular, Java, Spring Boot y MySQL. El proyecto contiene los siguientes modulos:

- Usuarios ( usuarios del sistema)
  - Agregar , editar.
  - Permisos segun los roles
  - Bloquear usuarios

  [![usuarioss.jpg](https://i.postimg.cc/6QV4KPBs/usuarioss.jpg)](https://postimg.cc/jW5SQZWv)

- Paciente ( clientes del sistema)
  - Agregar , editar, lista de pacientes,  filtro
  - Agregar , editar historial clinico

  [![pacientesss.jpg](https://i.postimg.cc/xjNYbzb8/pacientesss.jpg)](https://postimg.cc/grp1Crsb)

- Citas ( gestion de citas de los clientes )
  - Seleccionar psicologo para agendarle citas.
  - Seleccionar la fecha de la cita.
  - Agregar, editar, eliminar y listar citas.
  - Agrear un paciente si es un cliente nuevo.
  - visualizar citas en tabla.

  [![citass.jpg](https://i.postimg.cc/fbkXcCN1/citass.jpg)](https://postimg.cc/TyMpGrhc)
  
## Requisitos
  - Node.js
  - Angular CLI
  - Java 11
  - Spring Boot 2.5.4
  - MySQL

## Configuración


  ### Demo

  https://repo-clinica-angular-hazel.vercel.app/

  Credenciales

  Correo: admin@gmail.com
  contraseña: admin123


  ### Base de datos 
    
  La base de datos se genera automáticamente en spring boot utilizando la funcionalidad
  de JPA (Java Persistence API) y Hibernate, el script de llenado esta dentro del repositorio
  en el backend https://github.com/Bailon18/repo-clinica-spring en la carpeta BaseDeDatos
  
  ### Backend

  El proyecto del backend se encuentra https://github.com/Bailon18/repo-clinica-spring Abra
  el proyecto en su IDE y actualice las credenciales de la base de datos en el
  archivo `application.properties` ubicado en /backend/src/main/resources/. y crea la base datos
  en tu gestor local con el nombre `clinicaBd` Compile y ejecute el proyecto.
  El backend se ejecutará en  [http://localhost:8080](http://localhost:8080).


  ### Frontend

  Abra una terminal en el directorio /frontend. Ejecute `npm install` para instalar
  las dependencias.Ejecute `ng serve` para compilar y ejecutar el proyecto de Angular.
  La aplicación se ejecutará en http://localhost:4200.

  ### Uso

  Una vez que la aplicación esté en funcionamiento, los usuarios del sistema podrán
  iniciar sesión. Después del inicio de sesión, podrán registrar sus datos psicológicos de sus 
  pacientes , ver su historial clínico , gestionar citas y actualizar sus datos en cualquier momento.
  credenciales:


