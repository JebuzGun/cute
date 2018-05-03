'use strict';
const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3000;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/sale')
    .then(()=>{
        app.listen(port, ()=>{
           console.log('Servidor listo');
        });
    }).catch((err)=>{
        console.log(err);
    });