import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { log } from 'node:console';
console.log('Swagger будет искать спецификации в:', './src/**/*.swagger.yml');
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Uber API',
      version: '1.0.0',
      description: 'uber API',
    },
  },
  apis: ['./src/**/*.swagger.yml'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};