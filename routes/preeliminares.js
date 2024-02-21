var express = require('express');
var router = express.Router();
const Paciente = require('../models/pacientes')

/* GET home page. */
router.get('/', async function (req, res, next) {
  if (req.session.userId!=null) {
    const pacientes = await Paciente.find({})
  //console.log(usuarios)
  res.render('preeliminares', { title: 'Preeliminares',Logeado,role,pacientes, usuario });
  } else {
      res.redirect('/LoginInicio')
  }
  
});

module.exports = router;