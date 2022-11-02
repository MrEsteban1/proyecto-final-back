const productos = require("../../models/productos");
const Contenedor = require("../../contenedores/contenedorMongoDB");
const db = require("../../configs/mongo");
const { loggerConsola } = require("../../../logs4js");

module.exports = class ProductoDao extends Contenedor {
  constructor() {
    super(db, productos);
  }

  async getProducto(id) {
    return await this.getRegister(id);
  }

  async getProdByCategory(categoria) {

      try{
          let productos = await this.getRegister();
          loggerConsola.info("Categoria de filtro",categoria,productos.filter((producto) => producto.categoria === categoria),productos)
          const filtro = categoria !== "todos" ? productos.filter((producto) => producto.categoria === categoria)
                                                : productos
          return filtro;
      }
      catch(error){
          loggerConsola.error(error)
          return false
      }
  }

  async addProducto(data) {
    return await this.addRegister(data);
  }

  async updateProducto(id,data) {
    return await this.updateRegister(id, data);
  }

  async delProduct(id) {
    return await this.delRegister(id);
  }
};
