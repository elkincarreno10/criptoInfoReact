# Indica la imagen base
FROM node:16

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos
COPY . .

# Compila la aplicación
RUN npm run build
RUN cd dist

# Establece el puerto por defecto
EXPOSE 80

# Inicia la aplicación
CMD ["npx", "serve", "dist", "-l", "80"]