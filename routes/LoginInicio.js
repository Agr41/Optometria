var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/LoginInicio', function(req, res, next) {
  res.render('LoginInicio', { title: 'Login' });
});

module.exports = router;