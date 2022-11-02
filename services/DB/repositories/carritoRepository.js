const carritoFactory = require("../factory/carritoFactory")
const { loggerConsola } = require("../../logs4js")
let instance = null

class CarritoRepository {
    constructor(){
        this.dao = carritoFactory(process.env.STORAGE)
    }

    async addRegister(data){
        return await this.dao.addCarrito(data)
    }

    async updateRegister(id,data){
        return await this.dao.addProducto(id,data)
    }

    async getRegister(id){
        return await this.dao.getCarritoByID(id)
    }


    async delRegister(id){
        return await this.dao.deleteCarrito(id)
    }

    async delProducto(id,idProd){
        return await this.dao.deleteProducto(id, idProd)
    }

    static getInstance() {
        if (instance) {
            loggerConsola.info('instancia de repositorio reutilizada')
          return instance
        }
    
        loggerConsola.info('nueva instancia de repositorio')
        instance = new CarritoRepository()
    
        return instance
      }
}

module.exports = CarritoRepository