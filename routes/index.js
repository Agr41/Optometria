var express = require('express');
var router = express.Router();
const User =require("../models/Usuarios")


/* GET home page. */
router.get('/', async function (req, res, next) {
const usuarios = await User.find({})
console.log(role)
if (Logeado != null) {
    res.redirect('/HomeSessions')
}
res.render('index', { title: 'Sistema de registro de pacientes',usuarios,Logeado,role });
});

module.exports = router;
