'use strict';
const Sale = require('../models/sale');
const Product = require('../models/sale');

//Obtener ventas
function getSales(req, res) {
  Sale.find({}, {}).exec((err, sales) => {
    if (err) {
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
function saveSale(req, res) {
  let body = req.body;
  let products = req.body.products;
  let sale;
  let confirmed;
  let newStock;
  if (body.products && body.total) {
    sale = new Sale({
      place: body.place,
      products: products,
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
        for (let i = 0; products.length > i; i++) {
          let idProduct = products[i]._id;
          Product.findOne({_id: idProduct}, {}).exec((err, product) => {
            if (err) {
              return res.status(500).json({
                mensaje: 'Error al eliminar el usuario',
                ok: false,
              });
            }
            if (!product) {
              return res.status(404).json({
                mensaje: 'Usuario no registrado',
                ok: false
              });
            } else {
              newStock = new Product({
                code: product.code,
                name: product.name,
                stock: products[i].stock,
                description: product.description
              });
              newStock.save(( err, productUpdated ) => {
                if(err){
                  return res.status(400).json({
                    mensaje: 'Producto '+idProduct+' no actualizado',
                    ok: false,
                    errors: err
                  });
                }else{
                  confirmed.push(productUpdated.name);
                }
              });
            }
          });
        }
        res.status(201).json({
          venta: saleSaved,
          confirmados: confirmed,
          ok: true
        });
      }
    });
  } else {
    res.status(400).send({message: 'Ingrese los datos necers' +
      'sarios'});
  }
}

module.exports = {
  getSales,
  saveSale
};