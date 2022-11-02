const userFactory = require("../factory/userFactory")
const { loggerConsola } = require("../logs4js")
let instance = null

class UserRepository {
    constructor(){
        this.dao = userFactory(process.env.STORAGE)
    }

    async getUser(){
        return await this.dao.getUser()
    }

    async addRegister(){
        return await this.dao.addRegister()
    }

    async getRegister(id){
        return await this.dao.getRegister(id)
    }

    static getInstance() {
        if (instance) {
            loggerConsola.info('instancia de repositorio reutilizada')
          return instance
        }
    
        loggerConsola.info('nueva instancia de repositorio')
        instance = new UserRepository()
    
        return instance
      }
}

module.exports = UserRepository