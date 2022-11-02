const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {loggerError,loggerConsola,loggerWarn} = require("../logs4js")
const bcrypt = require("bcrypt");
const fs = require("fs");

const { usuarios } = require("../DB/daos/index");

passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      // loggerConsola.info(req.body)
      const {nombre,edad,direccion,telefono} = req.body
      usuarios.getUser(username).then(async (user) => {
        // loggerConsola.info("Info usuario: ",user,req.file)
        let avatar = "no"
        if (user) {
          loggerWarn.warn("El usuario ya fue registrado.")
          return done(null, false);
        } else {
          const hash = bcrypt.hashSync(password, 10);
          try {
            if (req.file){
              fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1]);
              avatar = req.file.filename + '.' + req.file.mimetype.split('/')[1];
            }
            let data = {
              username: username,
              password: hash,
              nombre,
              edad,direccion,telefono,avatar
            };
            let resultado = await usuarios.addRegister(data);
            resultado
              ? ((data.id = resultado), done(null, data))
              : done(null, false);
          } catch (error) {
            loggerError.error(error)
          }
        }
      });
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    ( username, password, done) => {
      usuarios
        .getUser(username)
        .then((user) => {
          if (!user) {
            return done(null, false);
          } else {
            if (bcrypt.compareSync(password, user.password)) {
              loggerConsola.warn("El usuario no coincide")
              return done(null, user);
            } else {
              return done(null, false);
            }
          }
        })
        .catch((e) => {
          loggerError.info(e)
          done(err)
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
  // loggerConsola.info("user", id)
  try {
    let resultado = await usuarios.getRegister(id)
    done(null, resultado);
  } catch (error) {
    loggerError.info(error)
  }
  
});

module.exports = passport;
