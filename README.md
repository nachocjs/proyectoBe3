AdoptMe - API de Adopción de Mascotas

API para la gestión de adopciones de mascotas, usuarios y mascotas. Incluye endpoints para usuarios, mascotas y adopciones, con documentación Swagger.

Requisitos

Node.js >= 18

npm

MongoDB

Docker (para ejecutar la imagen)

Instalación y ejecución local

Clonar el repositorio:

git clone <REPO_URL>
cd adoptme

Instalar dependencias:

npm install

Configurar el archivo .env:

PORT=8080
URI_MONGODB=<tu URI de MongoDB>
URI_MONGODB_TEST=<tu URI de MongoDB para tests>

Ejecutar el servidor:

npm start

El servidor estará disponible en http://localhost:8080

Documentación de la API

La documentación de Swagger se encuentra en:
http://localhost:8080/api/docs

Incluye todos los endpoints de Users, Pets, Mocks y Adoption, con request bodies, parámetros y responses.

Uso con Docker

Construir la imagen:

docker build -t nachocjs/adoptme:latest .

Ejecutar el contenedor:

docker run -p 8080:8080 nachocjs/adoptme:latest

El servidor estará disponible en http://localhost:8080
 dentro del contenedor.

Imagen en Dockerhub:
https://hub.docker.com/r/nachocjs/adoptme

Tests funcionales

Ejecutar tests:

npm test

Incluye tests para los endpoints de adoption.router.js usando Mocha + Chai.

Rutas principales

/api/users → Gestión de usuarios

/api/pets → Gestión de mascotas

/api/adoption → Gestión de adopciones

/api/mocks → Generación de datos de prueba

/api/docs → Documentación Swagger interactiva