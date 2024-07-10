const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Api Carrito',
    description: 'Rutas de api carrito entrega CoderHouse '
  },
  host: 'localhost:8080',
  definitions: {
   
    AddCart: {
      $products: [
        {
            idp: 12,
            quantity: 5
        }
      ]
    },
    AddProduct: {
      title: "Nombre producto",
      description: 'Descripción producto',
      code: '245841568747',
      price: 5300,
      status: true,
      stock: 4,
      category: 'Categoria',
      thumbnails: ['rutas','de','archivos'],
    },
    EditProduct: {
      title: "Nombre producto",
      description: 'Descripción producto',
      code: '245841568747',
      price: 5300,
      status: true,
      stock: 4,
      category: 'Categoria',
      thumbnails: ['rutas','de','archivos'],
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['./src/app.js'];

swaggerAutogen(outputFile, routes, doc);