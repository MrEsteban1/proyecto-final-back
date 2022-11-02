const ProductDAOMongo = require("../daos/mongo/productosDao")
//const ProductDAOFirebase = require("../daos/firebase/productosDao")

const getProductDAO = (storage="mongo") => {
    let dao = {}
    console.log("SE EJECUTA EL DAO")
    switch(storage){
        case 'mongo':
            dao = new ProductDAOMongo()
            break
        case 'firebase':
           // dao = new ProductDAOFirebase()
            break
        default:
            dao = new ProductDAOMongo()
            break
    }

    return new ProductDAOMongo()
}

module.exports = getProductDAO 