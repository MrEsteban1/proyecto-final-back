const CarritoDAOMongo = require("../daos/mongo/carritoDao")
//const CarritoDAOFirebase = require("../daos/firebase/carritoDao")

const CarritoUserDAO = (storage="mongo") => {
    let dao = {}
    switch(storage){
        case 'mongo':
            dao = new CarritoDAOMongo()
            break
        case 'firebase':
            //dao = new CarritoDAOFirebase()
            break
        default:
            dao = new CarritoDAOMongo()
            break
    }

    return new CarritoDAOMongo()
}

module.exports = CarritoUserDAO 