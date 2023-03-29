const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate= require('mongoose-paginate-v2')


// -------------- SCHEMA -------------- //
const userSchema = new Schema({
    username: String,
    password: String,
    role: String,
    Nombre: String,
    SegundoNombre:String,
    ApellidoPaterno:String,
    ApellidoMaterno:String

});

userSchema.plugin(mongoosePaginate);

// -------------- MODEL -------------- //
const User = mongoose.model("User", userSchema);

module.exports = User