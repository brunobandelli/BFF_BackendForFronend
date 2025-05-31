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

### Observação de Segurança

Durante os testes, foi identificado que era possível alterar o `encryptedData` e ainda obter uma resposta da descriptografia, mesmo com dados adulterados.  
Isso ocorre porque o algoritmo **AES-256-CTR**, por ser um modo de cifra por fluxo (stream cipher), **não oferece integridade dos dados** por padrão — ou seja, ele criptografa, mas não detecta alterações.

Para resolver esse problema, foi adicionada uma verificação com **HMAC-SHA256**.  
A HMAC atua como uma "assinatura digital" que garante que os dados criptografados **não foram modificados** após a criptografia.  
Se qualquer parte do conteúdo for alterada (como o `encryptedData`, `iv` ou `key`), a HMAC deixa de ser válida e a descriptografia é **bloqueada com erro**.