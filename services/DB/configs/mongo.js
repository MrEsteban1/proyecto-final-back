const { connect } = require("mongoose");
const {loggerConsola,loggerError} = require("../../logs4js")
require("dotenv").config();

//Conexion a la base de datos en Mongo.
const db = connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
}).then((_) => loggerConsola.info("DB conectada!")).catch(e=>{loggerError.error("No se pudo conectar: " + e.message )});
//
module.exports = db;
