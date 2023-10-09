var express = require('express');
var router = express.Router();
const Test = require('../models/Tets.js')
module.exports =async(req,res)=>{
  const tests= await Test.find({})
//OD
  // personas emétropes 
const PersonasEmetropesOD = await Test.find({ODReni:"HIPERMETROPIA"}).countDocuments();
  //personas miopes 
  const PersonasMiopesOD = await Test.find({ODReni:"EMETROPE"}).countDocuments();

  //personas hipermétropes
  const PersonasHipermetropesOD = await Test.find({ODReni:"MIOPIA"}).countDocuments();

// OI
  // personas emétropes 
  const PersonasEmetropesOI = await Test.find({OIReni:"HIPERMETROPIA"}).countDocuments();
  //personas miopes 
  const PersonasMiopesOI = await Test.find({OIReni:"EMETROPE"}).countDocuments();

  //personas hipermétropes
  const PersonasHipermetropesOI = await Test.find({OIReni:"MIOPIA"}).countDocuments();


  //console.log(PersonasEmetropesOD,PersonasMiopesOD,PersonasHipermetropesOD,PersonasEmetropesOI,PersonasEmetropesOI,PersonasMiopesOI,PersonasHipermetropesOI)
  
  if (req.session.userId!=null) {
    res.render('graficas', { title: 'Gráficas',Logeado,role,PersonasEmetropesOD,PersonasMiopesOD,PersonasHipermetropesOD,PersonasEmetropesOI,PersonasEmetropesOI,PersonasMiopesOI,PersonasHipermetropesOI });
  } else {
      res.redirect('/LoginInicio')
  }
}
