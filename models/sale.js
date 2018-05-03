'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const saleSchema = new Schema({
  place: { type: String },
  products: { type: [Schema.Types.Mixed] },
  date: { type: String },
  total: { type: Number }
});
module.exports = mongoose.model('Sale', saleSchema);