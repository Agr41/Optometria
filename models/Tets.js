
const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate= require('mongoose-paginate-v2')


// -------------- SCHEMA -------------- //
const TestSchema = new Schema({
    username: String,
    password: String,
    role: String,
    Nombre: String,
    SegundoNombre:String,
    ApellidoPaterno:String,
    ApellidoMaterno:String,
    Diagnostico:String,
    Ocupación:String,
    FechaNacimiento:String,
    País:String,

});

userSchema.plugin(mongoosePaginate);

// -------------- MODEL -------------- //
const Test = mongoose.model("Test", TestSchema);

module.exports = Test