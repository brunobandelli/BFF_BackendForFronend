FROM node:24-slim

WORKDIR /app

RUN npm install -g json-server@0.17.3

COPY comments.json .
COPY random-delay.js .

EXPOSE 3002

CMD ["json-server", "./comments.json", "--port", "3002", "--host", "0.0.0.0", "--middlewares", "./random-delay.js"]
