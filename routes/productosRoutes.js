const { Router } = require("express");
const {getProdController,addProdController,updateProdController,delProdController,getProdCategory} = require("../controllers/productosController")

const productosRouter = Router();

productosRouter.get("/:id?", getProdController);

productosRouter.get("/categoria/:categoria",getProdCategory)

productosRouter.post("/", (req, res) => {
  return addProdController(req,res)
});

productosRouter.put("/:id", 
  updateProdController
);

productosRouter.delete("/:id", (req, res) => {
  return delProdController(req,res)
});

module.exports = productosRouter;
