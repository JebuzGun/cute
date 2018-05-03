'use strict';
const express = require('express');
const SaleController = require('../controllers/sale');
const api = express.Router();
//Rutas
api.get('/', SaleController.getSales);
module.exports = api;