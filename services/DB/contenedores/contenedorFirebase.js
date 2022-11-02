const admin = require('firebase-admin')
const credentials = require('../db/firebase/credenciales.json')

admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: "http://ecommerce-70a05.firebaseio.com"
});

const db = admin.firestore()

module.exports = class Contenedor {
    constructor(coleccion='carritos') {
      this.collection = db.collection(coleccion)
    }

    async getRegister(id=false) {
      let resultado = []
      
      try{
        
        if(!id){
          const data = await this.collection.get();
          await data.forEach(doc => {
              resultado.push({ id: doc.id, ...doc.data() })
          }) 
        } else {
          const data = await this._getRegistersById(id);

          if(!!data){
            resultado = data
          } else resultado = []
          }
     }
     catch(error){
         console.log(error)
         resultado = []
     };

     return resultado
 }

    async _getRegistersById(id){
      let resultado
        try{
          let doc = await this.collection.doc(id);
          let data = (await doc.get()).data()
          resultado = !!data ? { id: doc.id, ...data } : false 
      }
      catch(error){
        console.log(error)
          resultado = false
      }

      return resultado
    }

    async addRegister(data){
      let resultado
      try {
        const doc = this.collection.doc()
        await doc.create(data).then(res => console.log(res.data))
        resultado = doc.id
    } catch (err){
        console.log(err);
        resultado = false
    }
    return resultado
    }

    async delRegister(id) {
      let resultado
      try{
          const item = await this.collection.doc(id).delete();
          console.log('borrad: '+item)
          resultado = true
      }
      catch(error){
          console.log(error)
          resultado = false
      }

      return resultado

  }

  async updateRegister(id,data){
      let resultado
      try {
        let dataInicial = await this._getRegistersById(id)
        dataInicial = {...dataInicial,...data}
        console.log(dataInicial)
        const actualizado = await this.collection.doc(dataInicial.id).set(dataInicial);
        resultado = true
      } catch (error) {
        console.log(error)
        resultado = false
      }

      return resultado
  }
  
    // async getRegister(id) {
    //   let resultado = {};
    //   try {
    //     if (!!req.params.id) resultado = await _getRegisterById(req.params.id);
    //     else
    //       await this.db
    //         .then((_) => this.model.find({}))
    //         .then((res) => (resultado = res));
    //   } catch (error) {
    //     console.log(error);
    //     resultado = [];
    //   }
  
    //   return resultado;
    // }
  
    // async delRegister(id) {
    //   let resultado;
    //   await this.db.then((_) =>
    //     this.model
    //       .deleteOne({ _id: ObjectId(id.toString()) })
    //       .then((_) => (resultado = true))
    //       .catch((e) => {
    //         console.log(e);
    //         resultado = false;
    //       })
    //   );
  
    //   return resultado;
    // }
  
    // async addRegister(data) {
    //   let resultado = {};
    //   await this.db
    //     .then((_) => this.model({ ...data }).save())
    //     .then((_) => (resultado = true))
    //     .catch((error) => {
    //       console.log(error);
    //       resultado = false;
    //     });
  
    //   return resultado;
    // }
  
    // async updateRegister(id, data) {
    //   const update = { ...data };
    //   delete update.id;
    //   let resultado;
    //   console.log(update, id.toString());
    //   await this.db
    //     .then((_) => this.model.find({ _id: id }))
    //     .then((res) => console.log(res))
    //     .then((_) => this.model.findOneAndUpdate({ _id: id }, update))
    //     .then((resolve) => {
    //       if (!!resolve) {
    //         resultado = true;
    //       } else resultado = false;
    //     })
    //     .catch((_) => {
    //       resultado = false;
    //     });
  
    //   return resultado;
    // }
  
    // async _getRegisterById(id) {
    //   let resultado = {};
    //   await this.db
    //     .then((_) => this.model.find({ _id: ObjectId(id.toString()) }))
    //     .then((res) => (resultado = res))
    //     .catch((e) => {
    //       console.log(e);
    //       resultado = [];
    //     });
  
    //   return resultado;
    // }
  };
  