const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Kpop API',
      version: '1.0.0',
      description: 'API para gerenciamento de grupos de K-pop'
    },
  servers: [
  {
    url: process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}/api`
      : 'http://localhost:3000/api'
  }
],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              example: 'admin'
            },
            password: {
              type: 'string',
              example: '123'
            }
          }
        },
        GroupInput: {
          type: 'object',
          required: ['name', 'fandom', 'debutYear'],
          properties: {
            name: {
              type: 'string',
              example: 'BLACKPINK'
            },
            fandom: {
              type: 'string',
              example: 'BLINK'
            },
            members: {
              type: 'array',
              items: {
                type: 'string'
              },
              example: ['Jisoo', 'Jennie', 'Rosé', 'Lisa']
            },
            debutYear: {
              type: 'integer',
              example: 2016
            },
            generation: {
              type: 'integer',
              example: 3
            }
          }
        },
        Group: {
          allOf: [
            {
              $ref: '#/components/schemas/GroupInput'
            },
            {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                  example: 1
                }
              }
            }
          ]
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            ok: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Token não informado'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js'] // lê seus comentários @swagger
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec
};