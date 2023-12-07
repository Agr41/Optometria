var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/',(req, res, next) => {
  
  if (req.session.userId!=null) {
    res.render('menu_clinica', { title: 'Menú clínica'});
  } else {
      res.redirect('/LoginInicio',Logeado,role, nombre)
  }
});

module.exports = router;
