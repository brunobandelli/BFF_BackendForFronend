const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Criptografia',
      version: '1.0.0',
    },
  },
  apis: [
    path.join(__dirname, './docs/posts.swagger.js'),
    path.join(__dirname, './docs/encrypt.swagger.js'),
  ],
};
const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
