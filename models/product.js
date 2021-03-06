'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = Schema({
  code: { type: String },
  name: { type: String },
  stock: { type: Number },
  description: { type: String },
  price: { type: Number },
  discountPrice: { type: Number },
  unitDiscount: { type: Number , default: 2 },
});
module.exports = mongoose.model('Product', ProductSchema);