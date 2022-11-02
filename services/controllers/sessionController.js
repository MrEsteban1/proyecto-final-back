const {loggerConsola} = require("../logs4js")
const passport = require("../passport/passport")

 const renderLogin = (req,res)=>{
    if(!req.user){
        res.sendFile("../public/login.html", { root: __dirname });
      }
      else{
        res.sendFile("../public/views/productos/index.html", { root: __dirname });
      }  
      loggerConsola.info(req.user)
 }

 const getUser = (req,res)=>{
    loggerConsola.info(req.user)
    if(!req.user){
      res.json({estado:false})
    }else{
      res.json({estado:true,...req.user})
    }  
 }

 const renderSignup = (req,res)=>{
    res.sendFile("./public/signup.html", { root: __dirname });
 }

 const loginPassport = (req,res)=>{
    return(
    passport.authenticate("login", {
        successRedirect: "/views/productos/index.html",
        failureRedirect: "/loginFalse.html",
    }))
 }

 const signupPassport = (req,res) => {
    return(
    passport.authenticate("signup", {
        successRedirect: "/login",
        failureRedirect: "/signupError.html",
    }))
 }

 module.exports = {getUser,renderLogin,renderSignup,loginPassport,signupPassport}