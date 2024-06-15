var express = require('express');
var router = express.Router();

router.get('/',(req, res, next) => {
 
  var idioma= req.session.language
  if (req.session.userId!=null) {
    res.render('HomeSessions', { title: 'Menú',Logeado,role, nombre,idioma , lng: req.session.language});
  } else {
      res.redirect('/LoginInicio')
  }
});
module.exports = router;
