var express = require('express');
var router = express.Router();
const User = require('../models/Usuarios')

/* GET home page. */
router.get('/', async function (req, res, next) {
  const usuarios = await User.find({})
  //console.log(usuarios)
  res.render('test', { title: 'Test',Logeado,role,usuarios });
});

module.exports = router;