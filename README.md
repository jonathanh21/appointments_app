
# Para correr la api

- version 14.19.0 o superior de node para el servidor
- Instalar postgresql
- Abrir pgadmin4 
- conectarse al servidor de postgres con las credenciales ingresadas en la instalacion (host:localhost, port:5432, user:postgres (a menos que se haya especificado de otra forma)) 
- crear base de datos (nombre = prueba). 
- Se puede crear la base de datos desde la consola si asi se prefiere

- ubicarse en la carpeta /api desde la terminal , correr el comando npm install y luego npm start para iniciar el servidor

- Una vez iniciado el servidor y creadas las tablas en la base de datos por parte de sequelize, necesitamos llenar el directorio medico de forma manual con el siguiente SQL script (se puede correr desde pgadmin o desde la cli de postgres)

- Las credenciales de conexion de la base de datos estan quemadas en el codigo (es una mala practica, pero teniendo en cuenta que estamos creando un boilerplate y la base de datos es de desarrollo local no deberia significar un problema, sin embargo, al conectarse a un servidor en la nube sea desarrollo o produccion, debe protegerse las credenciales para conexion a base de datos y otra data sensible) - Tener en cuenta esto en la creacion de la base de datos y en caso de que ya se haya creado, modificar los datos en el archivo /api/src/database/config.ts accorde a lo que se haya ingresado

```
    Insertar registros en la tabla de "Medicos":

    INSERT INTO "Medicos" (nombre, especialidad) VALUES
    ('Dr. Juan Pérez', 'Pediatría'),
    ('Dra. María Gómez', 'Cardiología'),
    ('Dr. Luis Rodríguez', 'Dermatología'),
    ('Dra. Ana Martínez', 'Neurología'),
    ('Dr. Carlos Sánchez', 'Ginecología'),
    ('Dra. Laura Hernández', 'Oftalmología'),
    ('Dr. Javier López', 'Ortopedia'),
    ('Dra. Carmen Fernández', 'Endocrinología'),
    ('Dr. Pablo García', 'Psiquiatría'),
    ('Dra. Rosa González', 'Oncología');

```
# Para correr el cliente

- version 16.17.0 o superior de node para el cliente

- ingresar a la carpeta cliente desde la terminal 
- crear el archivo .env para las variables de entorno

```
    # solo utilizaremos esta declaracion 
    VITE_BASE_URL='http://localhost:3000' 
```
- correr el comando npm install y luego npm run dev


En este puntos tanto el cliente como la base de datos deberian correr sin problemas e interactuar sin limitantes

