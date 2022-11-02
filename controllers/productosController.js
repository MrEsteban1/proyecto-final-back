const { loggerError, loggerConsola, loggerWarn } = require("../logs4js")
const {getProdService,addProdService,updateProdService,delProdService,getProdCatService} = require("../services/productosService")

const getProdController = async(req,res)=>{
    const id = req.params.id
    
    let resultado = false
    try {
        resultado = await getProdService(id)
    } catch (error) {
        loggerConsola.warn(error)
        resultado = false
    }
    resultado 
        ? res.json({estado:"OK",data:resultado})
        : res.json({estado:"error",descripcion:"No se encontro el producto"})
}

const getProdCategory = async(req,res)=>{
    const categoria = req.params.categoria
    
    let resultado = !!categoria
    try {
        resultado && (resultado = await getProdCatService(categoria))
        loggerConsola.info(resultado)
    } catch (error) {
        loggerConsola.warn(error)
        resultado = false
    }
    resultado 
        ? res.json({estado:"OK",data:resultado})
        : res.json({estado:"error",descripcion:"No se encontro el producto"})
}

const addProdController = async (req,res)=>{
    const data = req.body.data
    loggerConsola.info(data)
    let resultado = false
    try {
        resultado = await addProdService(data)
    } catch (error) {
        loggerConsola.error(error)
        resultado = false
    }

    resultado
      ? res.json({
          estado: "OK",
          descripcion: "Se agrego el producto",
        })
      : res.json({
          estado: "error",
          descripcion: "No se agrego el producto",
        });
}

const updateProdController = async (req,res)=>{
    const id = req.params.id;
    const data = req.body.data
    let resultado = false
    try {
        resultado = !!data &&  await updateProdService(id,data)
    } catch (error) {
        loggerError.info(error)
        resultado = false
    }
    resultado
      ? res.json({
          estado: "OK",
          descripcion: "Se actualizo el producto",
        })
      : res.json({
          estado: "error",
          descripcion: "No se actualizó el producto",
        });
}

const delProdController = async (req,res)=>{
    const id = req.params.id;
    let resultado = false
    try {
        resultado = await delProdService(id)
    } catch (error) {
        loggerConsola.error(error)
        resultado = false
    }
    resultado
      ? res.json({
          estado: "OK",
          descripcion: "Se elimino el producto",
        })
      : res.json({
          estado: "error",
          descripcion: "No se elimino el producto",
        });

}

module.exports = {getProdController,getProdCategory,addProdController,updateProdController,delProdController}