var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',(req, res, next) => {
  
  if (req.session.userId!=null) {
    res.render('form', { title: 'Form' ,Logeado,role});
  } else {
      res.redirect('/LoginInicio')
  }
});

const paciente = require('../models/pacientes')
router.post('/registrarpaciente',async function (req,res, next){
    console.log("entró a post")
if (req.session.userId!=null){
  await paciente.create(req.body)
  console.log("Creó paciente")
}
else{
  console.log("No tiene permisos")
}
      
      res.redirect('/')

}
)
module.exports = router;