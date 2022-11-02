const { loggerConsola } = require("../logs4js")

const validarPwrd = (req,res,next) => {
    const data = req.body
    loggerConsola.info("DATO DE SIGNUP:",data)
    if(!data) res.status(404).json({estado: false})
    if(data.password === data.pwdConfirmation){ 
        next()
        
    } else {
        loggerConsola.warn("NO COINCIDE LA CONTRASENIA")
        res.status(403).json({estado:false})
    }
}
module.exports = validarPwrd