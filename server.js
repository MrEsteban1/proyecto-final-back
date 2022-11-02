const express = require("express")
const app = express()
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const { loggerConsola } = require("./logs4js");
const cors = require("cors");
require('dotenv').config

const productosRouter = require("./routes/productosRoutes");
const routerCarrito = require("./routes/carritoRoutes");
const sessionRouter  = require("./routes/sessionRoutes");
const passport = require("./passport/passport");

app.use(express.urlencoded());
app.use(cors())
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/views"));
app.use(express.json({ extended: true })); 
app.use(cookieParser());

const PORT =  process.env.PORT ||8080

const options = { useNewUrlParser: true, useUnifiedTopology: true };

//Store
app.use(
    session({
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        options: options,
        ttl: 60 * 300,
      }),
      cookie: { maxAge: 600000 },
      secret: process.env.SESSION_SECRET || "qwerty",
      resave: false,
      saveUninitialized: true,
    })
  );

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/productos", productosRouter)
app.use("/api/carrito", routerCarrito)
app.use("/session",sessionRouter)

app.get("/",(req,res)=>{
    loggerConsola.info("Esta autenticado: ",req.isAuthenticated())
    res.status(202).redirect("/login");
})

app.get("/login", (req, res) => {
    res.sendFile("./public/login.html", { root: __dirname });
  });
  
app.get("/signup", (req, res) => {
    res.sendFile("./public/signup.html", { root: __dirname });
});

  app.use((req, res, next) => {
    res.status(404);
    loggerConsola.warn(`RUTA: ${req.originalUrl} - METODO: ${req.method} - RESULTADO: No implementado`)
    res.redirect('/login');
    next();
  });

const server = app.listen(PORT, ()=> loggerConsola.info(`Servidor escuchando en el puerto ${PORT}`))

server.on("error",e => console.log(e))