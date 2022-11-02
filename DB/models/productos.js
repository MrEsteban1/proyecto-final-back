const mongoose = require("mongoose");

const productosCollection = "productos";

const ProductosSchema = new mongoose.Schema({
  fecha: { type: Date, default: Date.now },
  nombre: { type: String, require: true, max: 80 },
  precio: { type: Number, require: true },
  imagen: { type: String, require: true },
  stock: { type: Number, require: true },
  descripcion: { type: String, require: true, max: 280 },
  categoria: { type: String, require: true },
});

const productos = mongoose.model(productosCollection, ProductosSchema);

module.exports = productos;
