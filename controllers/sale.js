'use strict';
const Sale = require('../models/sale');
//Obtener ventas
function getSales(req,res) {
  Sale.find({},{}).exec(( err,sales ) => {
    if(err){
      res.status(500).json({
        mensaje: 'Error obteniendo ventas',
        ok: false,
      });
    }
    res.status(200).json({
      ventas: sales,
      ok: true
    });
  });
}

module.exports = {
  getSales
};