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
//Almacenar venta
function saveSale(req,res){
  let body = req.body;
  let sale;
  if(!body.products && !body.total){
    sale = new Sale({
      place: body.place,
      products: body.products,
      date: body.date,
      total: body.total
    });
    sale.save((err, saleSaved) => {
      if (err) {
        return res.status(500).json({
          mensaje: 'Error ingresando venta',
          ok: false,
          error: err
        });
      } else {
        res.status(201).json({
          venta: saleSaved,
          ok: true
        });
      }
    });
  } else {
    res.status(400).send({ message: 'Ingrese los datos necesarios' });
  }
}
module.exports = {
  getSales,
  saveSale
};