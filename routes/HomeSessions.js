var express = require('express');
var router = express.Router();
var ingles= false
router.get('/',(req, res, next) => {
  console.log(Idioma)
  if(Idioma == "en-US"){
    ingles= true
  }
  if (req.session.userId!=null) {
    res.render('HomeSessions', { title: 'Menú',Logeado,role, nombre, ingles });
  } else {
      res.redirect('/LoginInicio')
  }
});
module.exports = router;
