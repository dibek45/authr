# Usa una imagen ligera con Alpine
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Instalar netcat para healthchecks
RUN apk add --no-cache netcat-openbsd

# Copiar package.json y package-lock.json
COPY package*.json ./

# 🔥 Instalar TODAS las dependencias (incluye devDependencies como @nestjs/cli)
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Compilar el proyecto usando el script de NestJS
RUN npm run build

# Exponer puerto (ajustado al puerto real del microservicio)
EXPOSE 4003

# Comando para producción
CMD ["node", "dist/main.js"]
