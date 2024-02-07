var express = require('express');
const { MongoClient } = require('mongodb');
var router = express.Router();
const Test = require('../models/Tets.js')
const Pacientes = require('../models/pacientes.js')
module.exports = async (req, res) => {
  const tests = await Test.find({})
  //OD
  var hombres = 0
var mujeres = 0
var edadRange6To12= 0
var edadRange13To17= 0
var edadRange18OrMore=0
let PersonasEmetropes = 0;
let PersonasMiopes = 0;
let PersonasHipermetropes = 0;
let PersonasMA = 0;
let PersonasHA = 0;
let PersonasAstigmatismo = 0;

let trc = 0;
let gpd = 0;
let cld = 0;
let excludedCitiesRegex = /(Torre[oóÓóÓnN]*|G[oóÓóÓ]*mez\s*Palacio?|Lerdo)/i;
let otherCitiesCount = 0;
  if(req.query.filtered!="true"){
  // personas emétropes 

   PersonasEmetropes = await Test.find({ ODReni: "EMETROPE", OIReni: "EMETROPE" }).countDocuments();
  //personas miopes 
   PersonasMiopes = await Test.find({ ODReni: "MIOPIA", OIReni: "MIOPIA" }).countDocuments();
  //personas hipermétropes
   PersonasHipermetropes = await Test.find({ ODReni: "HIPERMETROPIA", OIReni: "HIPERMETROPIA" }).countDocuments();

  //personas hipermétropes
   PersonasMA = await Test.find({ ODReni: "Astigmatismo MIOPIA", OIReni: "Astigmatismo MIOPIA" }).countDocuments();

  // personas emétropes 
   PersonasHA = await Test.find({ ODReni: "Astigmatismo HIPERMETROPIA", OIReni: "Astigmatismo HIPERMETROPIA" }).countDocuments();
  //personas miopes 
   PersonasAstigmatismo = await Test.find({ ODReni: "Astigmatismo EMETROPE", OIReni: "Astigmatismo EMETROPE" }).countDocuments();

   trc = await Pacientes.find({
    ciudad: { $regex: "torre[oóóÓÓnN]*", $options: "i" }
  }).countDocuments();
   gpd = await Pacientes.find({
    ciudad: { $regex: "g[oóÓóÓ]*mez\\s*palacio?", $options: "i" }
  }).countDocuments();
   cld = await Pacientes.find({
    ciudad: { $regex: "lerdo", $options: "i" }
  }).countDocuments();
   excludedCitiesRegex = /(Torre[oóÓóÓnN]*|G[oóÓóÓ]*mez\s*Palacio?|Lerdo)/i;
   otherCitiesCount = await Pacientes.find({ ciudad: { $not: { $regex: excludedCitiesRegex } } }).countDocuments();

  hombres = await Pacientes.find({ sexo: "M" }).countDocuments();
  mujeres = await Pacientes.find({ sexo: "F" }).countDocuments();

   edadRange6To12 = await Pacientes.find({
    Edad: { $gte: 6, $lte: 12 }
  }).countDocuments();
   edadRange13To17 = await Pacientes.find({
    Edad: { $gte: 13, $lte: 17 }
  }).countDocuments();

  edadRange18OrMore = await Pacientes.find({
    Edad: { $gte: 18 }
  }).countDocuments();
}
else{

  var arrayCond = []
if (req.query.hombres=="true"){
arrayCond.push({sexo:"M"})
}
if(req.query.mujeres=="true"){
  arrayCond.push({sexo:"F"})
}
if(req.query.kids=="true"){
  arrayCond.push({Edad: { $gte: 6, $lte: 12 }})
}
if(req.query.teens=="true"){
  arrayCond.push({Edad: { $gte: 13, $lte: 17 }})
}
if(req.query.adults=="true"){
  arrayCond.push({Edad: { $gte: 18 }})
}

var newArray = arrayCond.map(obj => {
  // Create a new object with updated keys
  const newObj = {};
  for (const key in obj) {
    // Append "patientInfo." to each key
    newObj[key] = obj[key];
  }
  return newObj;
});
const uri = 'mongodb+srv://NoLeDeboANadie:rickygei@noledeboanadie.i6p3wc9.mongodb.net/test'; // replace with your MongoDB connection string
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


    await client.connect();
    console.log('Connected to the database');


const database = client.db('test');
const patientsCollection = database.collection('pacientes');
const testsCollection = database.collection('tests');
// Step 1: Get patients above 18 and retrieve their _id
console.log(newArray)
const patientsQuery = {
  $and: newArray
};
const patientsResult = await patientsCollection.find(patientsQuery).toArray();
const patientIds = patientsResult.map(patient => patient._id.toString());
console.log(patientIds)
// Step 2: Count matching test documents where results for flu are "positive"
const testsQuery = { id: { $in: patientIds }, ODReni: "EMETROPE", OIReni: "EMETROPE"  };
const matchingTestsCount = await testsCollection.countDocuments(testsQuery);
console.log(matchingTestsCount)
  // personas emétropes 

   //PersonasEmetropes = await Test.aggregate(EmetropiaPipeline).exec();
   PersonasEmetropes=matchingTestsCount;
  //personas miopes 
   PersonasMiopes = await testsCollection.countDocuments({ id: { $in: patientIds }, ODReni: "MIOPIA", OIReni: "MIOPIA"  });
  //personas hipermétropes
   PersonasHipermetropes = await testsCollection.countDocuments({ id: { $in: patientIds }, ODReni: "HIPERMETROPIA", OIReni: "HIPERMETROPIA"  });

  //personas hipermétropes
   PersonasMA = await testsCollection.countDocuments({ id: { $in: patientIds }, ODReni: "Astigmatismo MIOPIA", OIReni: "Astigmatismo MIOPIA"  });

  // personas emétropes 
PersonasHA=await testsCollection.countDocuments({ id: { $in: patientIds }, ODReni: "Astigmatismo HIPERMETROPIA", OIReni: "Astigmatismo HIPERMETROPIA"  });
   //personas miopes 
   PersonasAstigmatismo = await testsCollection.countDocuments({ id: { $in: patientIds }, ODReni: "Astigmatismo EMETROPE", OIReni: "Astigmatismo EMETROPE"  });



  trc = await Pacientes.find({
    ciudad: { $regex: "torre[oóóÓÓnN]*", $options: "i" },$and: arrayCond
  }).countDocuments();
   gpd = await Pacientes.find({
    ciudad: { $regex: "g[oóÓóÓ]*mez\\s*palacio?", $options: "i" },$and: arrayCond
  }).countDocuments();
   cld = await Pacientes.find({
    ciudad: { $regex: "lerdo", $options: "i" },$and: arrayCond
  }).countDocuments();
   excludedCitiesRegex = /(Torre[oóÓóÓnN]*|G[oóÓóÓ]*mez\s*Palacio?|Lerdo)/i;
   otherCitiesCount = await Pacientes.find({ ciudad: { $not: { $regex: excludedCitiesRegex } } }).countDocuments();
     hombres = await Pacientes.find({ sexo: "M", $and: arrayCond }).countDocuments();

   mujeres = await Pacientes.find({ sexo: "F",$and: arrayCond }).countDocuments();
  

   edadRange6To12 = await Pacientes.find({
    Edad: { $gte: 6, $lte: 12 },$and: arrayCond
  }).countDocuments();
   edadRange13To17 = await Pacientes.find({
    Edad: { $gte: 13, $lte: 17 },$and: arrayCond
  }).countDocuments();

   edadRange18OrMore = await Pacientes.find({
    Edad: { $gte: 18 },$and: arrayCond
  }).countDocuments();
}
  

  //console.log(PersonasEmetropesOD,PersonasMiopesOD,PersonasHipermetropesOD,PersonasEmetropesOI,PersonasEmetropesOI,PersonasMiopesOI,PersonasHipermetropesOI)

  if (req.session.userId != null) {
    res.render('graficas', {
      title: 'Gráficas', Logeado, role,
      PersonasEmetropes: PersonasEmetropes,
      PersonasMiopes: PersonasMiopes,
      PersonasHipermetropes: PersonasHipermetropes,
      Astigmatismo: PersonasAstigmatismo,
      HA: PersonasHA,
      MA: PersonasMA,
      torreon: trc,
      gomez: gpd,
      lerdo: cld,
      otros: otherCitiesCount,
      masculino: hombres,
      femenino: mujeres,
      kids: edadRange6To12,
      teens: edadRange13To17,
      adults: edadRange18OrMore
    });
  } else {
    res.redirect('/LoginInicio')
  }
}
