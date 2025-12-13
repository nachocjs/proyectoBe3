# 1️⃣ Imagen base oficial de Node.js
FROM node:20-alpine

# 2️⃣ Directorio de trabajo dentro del contenedor
WORKDIR /app

# 3️⃣ Copiar package.json y package-lock.json primero (para instalar dependencias)
COPY package*.json ./

# 4️⃣ Instalar dependencias
RUN npm install --production

# 5️⃣ Copiar todo el proyecto
COPY . .

# 6️⃣ Variables de entorno
ENV PORT=8080

# 7️⃣ Exponer el puerto que usa la app
EXPOSE 8080

# 8️⃣ Comando para iniciar la app
CMD ["node", "src/app.js"]