// const {productos} = require("../daos/index")
const { loggerConsola } = require("../logs4js")
const Productos = require("../DB/repositories/ProductRepository")
const productos = Productos.getInstance()

const getProdService = async (id) =>{
    return await productos.getRegister(id)
}

const getProdCatService = async(categoria) => {
    return await productos.getByCategory(categoria)
}

const addProdService = async (data) => {
    loggerConsola.warn("DATA - SERVICE",data)
    return await productos.addRegister(data)
}
const updateProdService = async (id,data)=>{
    return await productos.updateRegister(id,data)
}

const delProdService = async (id) => {
    return await productos.delRegister(id)
}

module.exports = {getProdService,addProdService,updateProdService,delProdService,getProdCatService}