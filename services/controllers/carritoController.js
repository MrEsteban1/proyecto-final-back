const { loggerConsola } = require("../logs4js")
const carritoServices = require("../services/carritoServices")
const sendEmail = require("../config/nodemailer");


const addCarrito = async (req,res) => {
    const data = req.body.data
    loggerConsola.info("Data recibido del carrito: ",req.body.data)
    let resultado = !!data && await carritoServices.addCarrito(data)
    resultado
      ? res.json({
          estado: "OK",
          data: { id: resultado },
        })
      : res.json({
          estado: "error",
          descripcion: "No se agrego el carrito",
        });
}

const addProducto = async (req,res) => {
    const idCarrito = req.params.id
    const data = req.body.data
    let respuesta = await carritoServices.addProducto(idCarrito,data)
    respuesta
        ? res.json({ estado: "OK", data: "Se agrego el producto" })
        : res.json({ estado: "error", descripcion: "No se pudo actualizar" });
}

const getCarritoByID = async (req,res) => {
    const idCarrito = req.params.id
    let resultado = await carritoServices.getCarritoByID(idCarrito)
    loggerConsola.info(resultado)
    resultado
        ? res.json({ estado: "OK", ...resultado })
        : res.json({ estado: "error", descripcion: "No se pudo Obtener el carrito: "+idCarrito });
}

const delCarritoByID = async (req,res) => {
    const id = req.params.id
    let resultado = await carritoServices.deleteCarrito(id)
    resultado
        ? res.json({
            estado: "OK",
            descripcion: "Se elimino el carrito",
          })
        : res.json({
            estado: "error",
            descripcion: "No se elimino el carrito",
          });
}

const delProducto = async (req,res) => {
    const idCarrito = req.params.id
    const idProducto = req.params.id_prod

    let respuesta = await carritoServices.delProducto(idCarrito,idProducto)

    respuesta
        ? res.json({ estado: "OK", data: "Se elimino el producto" })
        : res.json({ estado: "error", descripcion: "No se elimino" });
}

const recibirPediodo = async (req,res) => {
    loggerConsola.info(req.body)
    const data = req.body
    const texto = 
    `Hola ${data.nombre}!
    Tu pedido es el siguiente:
    ${data.productos
    .map((producto) => `${producto.nombre} a $ ${producto.precio} \n`)
    .join("")}`;
    try {
      await sendEmail(
        data.username,
        texto,
        "IBIZA-DECO: Nuevo pedido de " + data.nombre,
        res
      );
    } catch (error) {
      loggerConsola.info(error)
    }
}

const carritoController = {addCarrito,addProducto,getCarritoByID,delCarritoByID,delProducto,recibirPediodo}

module.exports = carritoController
