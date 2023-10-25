/* Swagger configuration */
const options = {
    openapi: 'OpenAPI 3',   // Enable/Disable OpenAPI. By default is null
    language: 'en-US',      // Change response language. By default is 'en-US'
    disableLogs: false,     // Enable/Disable logs. By default is false
    autoHeaders: false,     // Enable/Disable automatic headers capture. By default is true
    autoQuery: false,       // Enable/Disable automatic query capture. By default is true
    autoBody: false         // Enable/Disable automatic body capture. By default is true
}

import dotenv from 'dotenv';
dotenv.config({ path: '../config/.env' });

import swaggerA from 'swagger-autogen';

const config = process.env
const swaggerAutogen = swaggerA();

const doc = {
  info: {
    version: '1.0.0',      // by default: '1.0.0'
    title: 'Short Url',        // by default: 'REST API'
    description: 'API for short url',  // by default: ''
    contact: {
        'name': 'API Short Url',
        'email': 'victormoreiracorrea@gmail.com'
    },
  },
  host: config.BASE,      // by default: 'localhost:3000'
  basePath: '/',  // by default: '/'
  schemes: ['http'],   // by default: ['http']
  consumes: ['application/json'],  // by default: ['application/json']
  produces: ['application/json'],  // by default: ['application/json']
  tags: [],
  securityDefinitions: {},  // by default: empty object
  definitions: {
    helathResponse: {
      code: '',
      message: '',
    },
    'errorResponse.400': {
      code: '400',
      message: 'Error parameters',
    },
    'errorResponse.403': {
      code: '403',
      message: 'Access denied',
    },
    'errorResponse.404': {
      "code": "404",
      "message": "Not found",
    },
    'errorResponse.500': {
      code: '500',
      message: 'Error internal',
    }
  },          // by default: empty object (Swagger 2.0)
};

const outputFile = './docs/swagger.json';
const endpointsFiles = ['./app.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */
swaggerAutogen(outputFile, endpointsFiles, doc);

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     require('./index.js'); // Your project's root file
//   });