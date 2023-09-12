var express = require('express');
var router = express.Router();
const User = require('../models/pacientes')

/* GET home page. */
router.get('/', async function (req, res, next) {
  if (req.session.userId!=null) {
    const usuarios = await User.find({})
  //console.log(usuarios)
  res.render('test', { title: 'Test',Logeado,role,usuarios });
  } else {
      res.redirect('/LoginInicio')
  }
  
});

module.exports = router;