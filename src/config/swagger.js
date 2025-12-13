import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuarios',
      version: '1.0.0',
      description: 'Documentación del módulo de Users',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '64f0c1f5e6a0a1b2c3d4e5f6' },
            first_name: { type: 'string', example: 'Juan' },
            last_name: { type: 'string', example: 'Pérez' },
            email: { type: 'string', example: 'juan@example.com' },
            role: { type: 'string', example: 'user', enum: ['user', 'admin'] },
            pets: { type: 'array', items: { type: 'string', example: '64f0c2a1e6a0a1b2c3d4e5f7' } },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        UserInput: {
          type: 'object',
          properties: {
            first_name: { type: 'string', example: 'Juan' },
            last_name: { type: 'string', example: 'Pérez' },
            email: { type: 'string', example: 'juan@example.com' },
            password: { type: 'string', example: 'coder123' },
            role: { type: 'string', example: 'user', enum: ['user', 'admin'] },
          },
          required: ['first_name', 'last_name', 'email', 'password'],
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
};