const swaggerUi = require('swagger-ui-express');

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "K-pop API",
    version: "1.0.0",
    description: "API de grupos de K-pop"
  },
  servers: [
    {
      url: "http://localhost:3000/api"
    }
  ],
  paths: {
    "/groups": {
      get: {
        summary: "Listar grupos",
        responses: {
          200: {
            description: "OK"
          }
        }
      }
    },
    "/groups/{id}": {
      get: {
        summary: "Buscar grupo por ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true
          }
        ],
        responses: {
          200: {
            description: "OK"
          }
        }
      }
    }
  }
};

module.exports = { swaggerUi, swaggerDocument };