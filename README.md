# **Descrição**
Este projeto é um Backend For Frontend (BFF) que utiliza múltiplos serviços para posts, comentários e usuários, cada um rodando em um container Docker separado e com requisições criptografadas. 

# **Requisitos**
* Docker

* Docker Compose

## Como rodar

*Clone o repositório:*
git clone "url"

### **Para construir as imagens, subir os containers e rodar o projeto, rode:**
```js
npm run docker 
```
Ou
```js
docker compose up --build
```

### **Para validar os testes unitario, rode:**
```js
npm run test
```

### *Os serviços estarão disponíveis nas seguintes portas:*

BFF principal: http://localhost:3000

Serviço de posts (json-server): http://localhost:3001

Serviço de comentários: http://localhost:3002

Serviço de usuários: http://localhost:3003


### *A documentação Swagger está disponível em:*
http://localhost:3000/api-docs

### *HTTP_REQUESTS:*
Na pasta HTTP_REQUESTS estão os arquivos .har e .yaml para importar para dentro do API Clients (Insomnia e Postman).

#### Comandos úteis

Para acessar o shell do container do serviço de posts:
```js
docker compose exec posts sh
```

Para parar os containers:
```js
docker compose down
```