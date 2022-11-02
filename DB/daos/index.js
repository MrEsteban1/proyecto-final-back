const DaoCarritoMongo = require("./mongo/carritoDao");
const DaoProductoMongo = require("./mongo/productosDao");
// const DaoCarritoFirebase = require("./firebase/carritoDao");
// const DaoProductoFirebase = require("./firebase/productosDao");
const DaoUsuariosMongo = require("./mongo/usuarioDao");

let contenedor = process.env.STORAGE || "mongodb";
let Daos = {};

switch (contenedor) {
  case "mongodb":
    Daos.usuarios = new DaoUsuariosMongo();
     Daos.carrito = new DaoCarritoMongo();
     Daos.productos = new DaoProductoMongo();
    break;
  // case "firebase":
  //   console.log("aqui");
  //   Daos.carrito = new DaoCarritoFirebase();
  //   Daos.productos = new DaoProductoFirebase();
  //   break;
  default:
    Daos.carrito = new DaoCarritoMongo();
    Daos.productos = new DaoProductoMongo();
    break;
}

module.exports = Daos;
