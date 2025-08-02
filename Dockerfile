# Usa una imagen más ligera basada en Alpine
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Instalar netcat para el healthcheck
RUN apk add --no-cache netcat-openbsd

# Copiar package.json y package-lock.json primero para optimizar el cacheo
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install


# Copiar el código fuente
COPY . .

# Compilar la aplicación con NestJS
RUN npx nest build

# Exponer el puerto 4001 para TCP
EXPOSE 4003

# Comando para ejecutar el microservicio en producción
CMD ["node", "dist/main.js"]
