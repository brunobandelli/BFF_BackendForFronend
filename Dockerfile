# Usa imagem oficial do Node
FROM node:24-slim

# Define o diretório dentro do container
WORKDIR /app

# Copia os arquivos de dependência e instala
COPY package*.json ./
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta do seu BFF
EXPOSE 3000

# Comando para iniciar sua aplicação
CMD ["node", "src/index.js"]

