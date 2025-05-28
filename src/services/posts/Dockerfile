FROM node:24-slim

WORKDIR /app

RUN npm install -g json-server@0.17.3

COPY posts.json .
COPY random-delay.js .

EXPOSE 3001

CMD ["json-server", "./posts.json", "--port", "3001", "--host", "0.0.0.0", "--middlewares", "./random-delay.js"]
