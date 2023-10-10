var express = require('express');
var router = express.Router();
const Test = require('../models/Tets.js')
const Pacientes = require('../models/pacientes.js')
module.exports =async(req,res)=>{
  const tests= await Test.find({})
//OD
  // personas emétropes 
const PersonasEmetropes = await Test.find({ODReni:"HIPERMETROPIA", OIReni:"HIPERMETROPIA"}).countDocuments();
  //personas miopes 
  const PersonasMiopes = await Test.find({ODReni:"EMETROPE", OIReni:"EMETROPE"}).countDocuments();
    //personas hipermétropes
    const PersonasHipermetropes = await Test.find({ODReni:"MIOPIA", OIReni:"MIOPIA"}).countDocuments();

  //personas hipermétropes
  const PersonasMA = await Test.find({ODReni:"Astigmatismo MIOPIA", OIReni:"Astigmatismo MIOPIA" }).countDocuments();

  // personas emétropes 
  const PersonasHA = await Test.find({ODReni:"Astigmatismo HIPERMETROPIA", OIReni:"Astigmatismo HIPERMETROPIA"}).countDocuments();
  //personas miopes 
  const PersonasAstigmatismo = await Test.find({ODReni:"Astigmatismo EMETROPE", OIReni:"Astigmatismo EMETROPE"}).countDocuments();

  const trc = await Pacientes.find({
    ciudad: { $regex: "torre[oóóÓÓnN]*", $options: "i" }
  }).countDocuments();
  const gpd = await Pacientes.find({
    ciudad: { $regex: "g[oóÓóÓ]*mez\\s*palacio?", $options: "i" }
  }).countDocuments();
  const cld = await Pacientes.find({
    ciudad: { $regex: "lerdo", $options: "i" }
  }).countDocuments();
  const excludedCitiesRegex = /(Torre[oóÓóÓnN]*|G[oóÓóÓ]*mez\s*Palacio?|Lerdo)/i;
const otherCitiesCount = await Pacientes.find({ ciudad: { $not: { $regex: excludedCitiesRegex } } }).countDocuments();

const hombres = await Pacientes.find({sexo:"masculino"}).countDocuments();
const mujeres = await Pacientes.find({sexo:"femenino"}).countDocuments();

  //console.log(PersonasEmetropesOD,PersonasMiopesOD,PersonasHipermetropesOD,PersonasEmetropesOI,PersonasEmetropesOI,PersonasMiopesOI,PersonasHipermetropesOI)
  
  if (req.session.userId!=null) {
    res.render('graficas', { title: 'Gráficas',Logeado,role,
    PersonasEmetropes:PersonasEmetropes,
    PersonasMiopes:PersonasMiopes,
    PersonasHipermetropes:PersonasHipermetropes,
  Astigmatismo: PersonasAstigmatismo,
HA:PersonasHA,
MA:PersonasMA,
torreon: trc,
gomez:gpd,
lerdo:cld,
otros:otherCitiesCount,
masculino: hombres,
femenino: mujeres
 });
  } else {
      res.redirect('/LoginInicio')
  }
}
