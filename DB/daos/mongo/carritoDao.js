const db = require("../../configs/mongo")
const carritos = require("../../models/carrito");
const Contenedor = require("../../contenedores/contenedorMongoDB");
const { loggerError, loggerConsola } = require("../../../logs4js");

module.exports = class CartDao extends Contenedor {
  constructor() {
    super(db, carritos);
  }

  async addCarrito(data) {
    const carrito = {
      ...data.fecha,
      productos: [{ ...data }],
    };
    console.log("holaas ", carrito.productos);
    let resultado = await this.addRegister(carrito);

    return resultado
  }

  async getCarritoByID(id) {
    let resultado = {};
    try {
      resultado = await this.getRegister(id);
      console.log(resultado);
    } catch (error) {
      console.log(error);
      resultado = false
    }

    return resultado
  }

  async deleteCarrito(id) {
    let resultado = false
    try {
      resultado = await this.delRegister(id);
    } catch (error) {
      loggerError.info(error)
      resultado = error
    }

    return resultado
  }

  async addProducto(id, data) {
    let resultado = false
    try {
      let carrito = await this.getRegister(id);
      loggerConsola.info("carrito actual: ", ...carrito.productos)
      if (carrito) {
        carrito.productos = [...carrito.productos, data];
      }
      resultado = await this.updateRegister(id, carrito);
      
    } catch (error) {
      loggerError.info(error)
      resultado = false
    }

    return resultado
  }

  async deleteProducto(id_carrito,id_producto) {
    let resultado = false
    try {
      let carrito = await this.getRegister(id_carrito);
      loggerConsola.info(carrito);
      if (carrito) {
        const index = carrito.productos.findIndex((dato) => {
          return dato.id == id_producto;
        });
        carrito.productos = carrito.productos.splice(index, 1);
      }
      loggerConsola.info("SALIDA: ", carrito.productos);
      loggerConsola.info("---------------------------------");
      let respuesta = await this.updateRegister(id_carrito, carrito);
      resultado = respuesta
    } catch (error) {
      loggerConsola.info(error);
      resultado = false
    }

    return resultado
  }
};
