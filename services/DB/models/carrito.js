const mongoose = require("mongoose");
const productoSchema = require("./productos");

const productosCollection = "carritos";

const ProductosSchema = new mongoose.Schema({
  fecha: { type: Date, default: Date.now },
  productos: { type: Array, required: true },
});

const carritos = mongoose.model(productosCollection, ProductosSchema);

module.exports = carritos;
