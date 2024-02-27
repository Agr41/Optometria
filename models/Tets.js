
const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate= require('mongoose-paginate-v2')


// -------------- SCHEMA -------------- //
const TestSchema = new Schema({

    id: String,
    Folio:String,
    Diagnostico:String,
    Ocupación:String,
    FechaNacimiento:String,
    País:String,
    FechaDelTest:Date,
    //<---Pre-test--->
    Diabetes:Boolean,
    Hipertension:Boolean,
    Cataratas:Boolean,
    Glaucoma:Boolean,
 
    ConLentesDistancia:String,
    ConLentesCerca:String,
    SinLentesDistancia:String,
    SinLentesCerca:String,

    grupoRadioA:String,
    grupoRadioB:String,
    grupoRadioC:String,

    ODReni:String,
    OIReni:String,
    opcion:String,
    Optometrista:String,

    CamposDeFormulario: {
        type: Schema.Types.Mixed, // O puedes usar '{}' para un objeto literal
    },




});

TestSchema.plugin(mongoosePaginate);

// -------------- MODEL -------------- //
const Test = mongoose.model("Test", TestSchema);

module.exports = Test






/*


const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate= require('mongoose-paginate-v2')


// -------------- SCHEMA -------------- //
const TestSchema = new Schema({

    id: String,
    Folio:String,
    Diagnostico:String,
    Ocupación:String,
    FechaNacimiento:String,
    País:String,
    FechaDelTest:Date,
    //<---Pre-test--->
    //Condiciones
    Diabetes:Boolean,
    Hipertension:Boolean,
    //EmbarazoOlactancia:Boolean,
    Cataratas:Boolean,
    Glaucoma:Boolean,
    //Caratatas:Boolean,
    //DolorDeCabeza:Boolean,
    //Alergias:String,
    //Otro:String,
    //MedicamentosActuales:String,
    //AgudezaVisual
    ConLentesDistancia:String,
    ConLentesCerca:String,
    SinLentesDistancia:String,
    SinLentesCerca:String,
    //Pupilas
    //Izquierdo:String,
    //Derecha:String,

    grupoRadioA:String,
    grupoRadioB:String,
    grupoRadioC:String,
    //grupoRadio2A:String,
    //grupoRadio2B:String,
    //grupoRadio2C:String,
        //<---Refraccion--->
    //Retinoscopía
     //Comentado

    ODReni2:String,
    OIReni2:String,
    ODReni1:String,
    OIReni1:String,
       //Comentado

    ODReni:String,
    OIReni:String,
    opcion:String,
    Optometrista:String,


    //Comentado
    OIReni:String,
    ODReni:String,
    AVReni:String,
    AVReni2:String,
    //Comentado


    //Examen Subjetivo
        //Comentado

    OIExam:String,
    ADExam:String,
    AVExam:String,
    AVExam2:String,
    Observaciones:String,
        //Comentado

        //<---Examination--->

    //Examination
    //Comentado
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
    Galucoma2:Boolean,
    Cataracts:Boolean,
    ODExamination:Boolean,
    OSExamination:Boolean,
    PriorSurg:Boolean,
    ODExamination2:Boolean,
    OSExamination2:Boolean,
    OtherExamination:String,
    //comentado
    //<---Optical--->

    //ODOptical:String,
    //OSOptical:String,



});

TestSchema.plugin(mongoosePaginate);

// -------------- MODEL -------------- //
const Test = mongoose.model("Test", TestSchema);

module.exports = Test
*/