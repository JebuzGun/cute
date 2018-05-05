'use strict';
const Product = require('../models/product');
//Obtener productos
function getProducts(req, res) {
  Product.find({}, {}).exec((err, products) => {
    if (err) {
      res.status(500).json({
        mensaje: 'Error cargando productos',
        ok: false,
        errors: err
      });
    }
    res.status(200).json({
      productos: products,
      ok: true
    });
  });
}
//Obtener producto
function getProduct(req, res) {
  let id = req.params.id;
  Product.findById(id, (err, product) => {
    if (err) {
      return res.status(500).json({
        mensaje: 'Error',
        ok: false,
      });
    }
    if (!product) {
      return res.status(404).json({
        mensaje: 'Producto no registrado',
        ok: false
      });
    } else {
      res.status(200).json({
        product: product,
        ok: true
      });
    }
  });
}
//Almacenar producto
function saveProduct(req, res) {
  let product;
  let body = req.body;
  if (body.name && body.name !== '') {
    product = new Product({
      code: body.code,
      name: body.name,
      stock: body.stock,
      description: body.description,
      price: body.price,
      discountPrice: body.discountPrice
    });
    product.save((err, productSaved) => {
      if (err) {
        return res.status(500).json({
          mensaje: 'Error almacenando',
          ok: false,
          error: err
        });
      } else {
        res.status(201).json({
          producto: productSaved,
          ok: true
        });
      }
    });
  } else {
    res.status(400).send({message: 'Ingrese los datos necesarios'});
  }
}
//Eliminar producto
function deleteProduct(req, res) {
  let id = req.params.id;
  Product.findByIdAndRemove(id, (err, productDeleted) => {
    if (err) {
      return res.status(500).json({
        mensaje: 'Error al realizar la transacción',
        ok: false,
      });
    }
    if (!productDeleted) {
      return res.status(400).json({
        mensaje: 'Usuario no encontrado',
        ok: false,
      });
    }
    res.status(200).json({
      producto: productDeleted,
      ok: true
    });
  });
}
//Actualizar producto
function updateProduct(req, res) {
  let id = req.params.id;
  let body = req.body;
  Product.findById(id, (err, product) => {
    if (err) {
      return res.status(500).json({
        mensaje: 'Error al eliminar el producto',
        ok: false,
      });
    }
    if (!product) {
      return res.status(404).json({
        mensaje: 'Producto no registrado',
        ok: false
      });
    } else {
      product.name = body.name;
      product.code = body.code;
      product.stock = body.stock;
      product.description = body.description;
      product.price = body.price;
      product.discountPrice = body.discountPrice;
      product.unitDiscount = body.unitDiscount;
      product.save(( err, productUpdated ) =>{
        if (err) {
          return res.status(400).json({
            mensaje: 'Producto no actualizado',
            ok: false,
            errors: err
          });
        }
        if (!productUpdated) {
          return res.status(400).json({
            mensaje: 'Producto no actualizado',
            ok: false,
            errors: err
          });
        }else{
          return res.status(200).json({
            producto: productUpdated,
            ok: true
          });
        }
      });
    }
  });
}
module.exports = {
  getProducts,
  getProduct,
  saveProduct,
  deleteProduct,
  updateProduct
};

