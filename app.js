'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//cargar rutas
const product_routes = require('./routes/product');
const sale_routes = require('./routes/sale');
//middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
  res.header('Allow', 'GET,POST,OPTIONS,PUT,DELETE');
  next();
});
//rutas
app.use('/api/product', product_routes);
app.use('/api/sale', sale_routes);
module.exports = app;