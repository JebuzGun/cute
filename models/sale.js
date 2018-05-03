'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const saleSchema = new Schema({
    place: {type: String},
    products:
        {
            type: [{
                code: { type: String },
                quantity: { type: Number },
                offValue: { type: Boolean, default: false }
            }]
        },
    date: String,
    total: Number
});
module.exports = mongoose.model('Sale', saleSchema);