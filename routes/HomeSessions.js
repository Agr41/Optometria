var express = require('express');
var router = express.Router();

router.get('/',(req, res, next) => {
  
  if (req.session.userId!=null) {
    res.render('HomeSessions', { title: 'Menú',Logeado,role, nombre });
  } else {
      res.redirect('/LoginInicio')
  }
});
module.exports = router;
