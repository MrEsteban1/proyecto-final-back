const {Router} = require("express")
const {getUser,renderLogin,renderSignup,loginPassport,signupPassport} = require("../controllers/sessionController")
const {loggerConsola} = require("../logs4js")
const validarPwrd = require("../middleware/validaciones")

const sessionRouter = Router()

sessionRouter.get("/userLoged",(req,res)=>{ 
    getUser(req,res)
    
})

sessionRouter.get("/login",(req,res)=>{
    loggerConsola.info("Pasa por el render session/login")
    renderLogin(req,res)
})

sessionRouter.get("/signup", (req,res)=>{
    renderSignup(req,res)
})

sessionRouter.post("/register",validarPwrd,
    signupPassport()
)

sessionRouter.post("/login",
    loginPassport()
)

module.exports = sessionRouter