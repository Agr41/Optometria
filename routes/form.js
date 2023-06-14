var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('form', { title: 'Form' ,Logeado,role});
});
const paciente = require('../models/pacientes')
router.post('/registrarpaciente',async function (req,res, next){
    console.log("entró a post")

      await paciente.create(req.body)
      console.log("Creó paciente")
      //await User.updateOne({username:req.body.username},{username:req.body.username+req.body.correo})
      res.redirect('/')

}
)
module.exports = router;