var express = require('express');
var router = express.Router();
const User =require("../models/Usuarios")


/* GET home page. */
router.get('/', async function (req, res, next) {
const usuarios = await User.find({})
console.log(role)
res.render('index', { title: 'Express',usuarios,Logeado,role });
});

module.exports = router;
