//const { carrito } = require("../daos/index");
const Carrito = require("../DB/repositories/carritoRepository")
const carrito = Carrito.getInstance()

const addCarrito = async (data) => {
    data.fecha = new Date()
    return await carrito.addRegister(data)
}

const addProducto = async (id,data) => {
    return await carrito.updateRegister(id,data)
}

const getCarritoByID = async (id) => {
    return await carrito.getRegister(id)
}

const deleteCarrito = async (id) => {
    return await carrito.delRegister(id)
}

const delProducto = async (id,idProd) => {
    return await carrito.delProducto(id,idProd)
}

const carritoServices = {addCarrito,addProducto,getCarritoByID,deleteCarrito,delProducto}

module.exports = carritoServices