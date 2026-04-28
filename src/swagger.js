const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Kpop API",
      version: "1.0.0",
      description: "API de gerenciamento de grupos de K-pop"
    }
  },

  // IMPORTANTE: caminho mais estável
  apis: ["./src/routes/*.js"]
};

const specs = swaggerJsDoc(options);

module.exports = {
  swaggerUi,
  specs
};