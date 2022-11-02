const { Router } = require("express");
const carritoController = require("../controllers/carritoController");
const sendEmail = require("../config/nodemailer");

const routerCarrito = Router();

routerCarrito.post("/:id/producto", async (req, res) => {
  return await carritoController.addProducto(req,res)
});

routerCarrito.post("/", async (req, res) => {
  return await carritoController.addCarrito(req,res)
});

routerCarrito.get("/:id", async (req, res) => {
  return await carritoController.getCarritoByID(req,res)
});

routerCarrito.delete("/:id", async (req, res) => {
  return await carritoController.delCarritoByID(req,res)
});

routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
  return await carritoController.delProducto(req,res)
});

routerCarrito.post("/pedido", async (req, res) => {
  return await carritoController.recibirPediodo(req,res)
});

module.exports = routerCarrito;
