var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  if (Logeado != null) {
    res.redirect('/HomeSessions')
}
  res.render('LoginInicio', { title: 'Login',Logeado,role, error:req.query.error });
});

module.exports = router;
