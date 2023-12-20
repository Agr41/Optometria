var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/',(req, res, next) => {
  var ingles = false
console.log(Idioma)
if (Idioma == "en-US"){
  ingles = true;
}
  if (req.session.userId!=null) {
    res.render('configuracion', { title: 'Configuracion',Logeado,role, nombre, ingles});
  } else {
      res.redirect('/LoginInicio')
  }
});

module.exports = router;
