
const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate= require('mongoose-paginate-v2')


// -------------- SCHEMA -------------- //
const TestSchema = new Schema({

    username: String,
    Diagnostico:String,
    Ocupación:String,
    FechaNacimiento:String,
    País:String,
    //<---Pre-test--->
    //Condiciones
    Diabetes:Boolean,
    PresiónAlta:Boolean,
    EmbarazoOlactancia:Boolean,
    ProblemasDelCorazón:Boolean,
    Galucoma:Boolean,
    Caratatas:Boolean,
    DolorDeCabeza:Boolean,
    Alergias:String,
    Otro:String,
    MedicamentosActuales:String,
    //AgudezaVisual
    ConLentesDistancia:String,
    ConLentesCerca:String,
    SinLentesDistancia:String,
    SinLentesCerca:String,
    //Pupilas
    Izquierdo:String,
    Derecha:String,
    Distancia:String,
    Cerca:String,
        //<---Refraccion--->
    //Retinoscopía
    OIReni:String,
    ODReni:String,
    AVReni:String,
    AVReni2:String,
    //Examen Subjetivo
    OIExam:String,
    ADExam:String,
    AVExam:String,
    AVExam2:String,
    Observaciones:String,
        //<---Examination--->

    //Examination
    Myopia:Boolean,
    Hyperopia:Boolean,
    Asigmatism:Boolean,
    Presbyopia:Boolean,
    Anisometropia:Boolean,
    Amblyopia:Boolean,
    Strabismus:Boolean,
    DiabeticRet:Boolean,
    HtnRet:Boolean,
    DryEye:Boolean,
    Pinguecula:Boolean,
    Pterygium:Boolean,
    Conjuntivitis:Boolean,
    Galucoma:Boolean,
    Cataracts:Boolean,
    ODExamination:Boolean,
    OSExamination:Boolean,
    PriorSurg:Boolean,
    ODExamination2:Boolean,
    OSExamination2:Boolean,
    OtherExamination:String,
    //<---Optical--->
    ODOptical:String,
    OSOptical:String,
    Notas:String



});

userSchema.plugin(mongoosePaginate);

// -------------- MODEL -------------- //
const Test = mongoose.model("Test", TestSchema);

module.exports = Test