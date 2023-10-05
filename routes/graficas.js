var express = require('express');
var router = express.Router();

router.get('/',(req, res, next) => {
  
  if (req.session.userId!=null) {
    res.render('graficas', { title: 'Gráficas',Logeado,role });
  } else {
      res.redirect('/LoginInicio')
  }
});
module.exports = router;
