const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate= require('mongoose-paginate-v2')


// -------------- SCHEMA -------------- //
const pacienteSchema = new Schema({
    Nombre: String,
    ApellidoPaterno:String,
    NombreCompleto:String,
    ciudad:String,
    ocupacion: String,
    ultimoexamen: String,
    sexo: String,
    fnacimiento: String,
    Folio:String,
    id:String,
    /*
    OD:String,
    OI:String
    */

});


pacienteSchema.plugin(mongoosePaginate);

// -------------- MODEL -------------- //
const paciente = mongoose.model("paciente", pacienteSchema);

module.exports = paciente