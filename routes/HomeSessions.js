var express = require('express');
var router = express.Router();

router.get('/',(req, res, next) => {
  var ingles= false
  console.log(Idioma)
  if(Idioma == "en-US"){
    ingles= true
  }
  console.log("ing "+ingles)
  if (req.session.userId!=null) {
    res.render('HomeSessions', { title: 'Menú',Logeado,role, nombre, ingles });
  } else {
      res.redirect('/LoginInicio')
  }
});
module.exports = router;
