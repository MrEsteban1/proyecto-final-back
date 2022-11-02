const mongoose = require("mongoose");

const userCollection = "usuarios";

const UserSchema = new mongoose.Schema({
  username: {type: String,require:true},
  password: { type: String, require: true },
  nombre: { type: String, require: true },
  direccion: {type:String, require:true},
  edad: {type:Number,require:true},
  telefono: {type:Number, require:true},
  avatar: {type:String, require:true}
});

const User = mongoose.model(userCollection, UserSchema);

module.exports = User;
