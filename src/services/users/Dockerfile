FROM node:24-slim

WORKDIR /app

RUN npm install -g json-server@0.17.3

COPY users.json .
COPY random-delay.js .

EXPOSE 3003

CMD ["json-server", "./users.json", "--port", "3003", "--host", "0.0.0.0", "--middlewares", "./random-delay.js"]
