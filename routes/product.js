'use strict';
const express = require('express');
const ProductController = require('../controllers/product');
const api = express.Router();
//middlewares

//rutas
api.get('/', ProductController.getProducts);
api.get('/:id', ProductController.getProduct);
api.post('/', ProductController.saveProduct);
api.put('/:id', ProductController.updateProduct);
api.delete('/', ProductController.deleteProduct);
module.exports = api;