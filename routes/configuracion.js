var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/',(req, res, next) => {
  
  if (req.session.userId!=null) {
    res.render('configuracion', { title: 'Configuracion',Logeado,role, nombre});
  } else {
      res.redirect('/LoginInicio')
  }
});

module.exports = router;
