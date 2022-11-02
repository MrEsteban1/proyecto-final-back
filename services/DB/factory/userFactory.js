const UserDAOMongo = require("../daos/mongo/usuarioDao")

const getUserDAO = (storage="mongo") => {
    let dao = {}
    switch(storage){
        case 'mongo':
            dao = new UserDAOMongo()
            break
        case 'firebase':
            dao = new UserDAOMongo()
            break
        default:
            dao = new UserDAOMongo()
            breaks
    }

    return dao
}

module.exports = getUserDAO 