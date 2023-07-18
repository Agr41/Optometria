var express = require('express');
var router = express.Router();
//var passport = require('passport');
//var {client,dbName} = require('../db/mongo');

// passport.deserializeUser(
//   async function(id, done) {
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection('users');
//     collection.findOne({username:id}, function (err, user) {
//       done(err, user);});
// });

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('HomeSessions', { title: 'HomeS',Logeado,role });
// });


router.get('/',(req, res, next) => {
  
  if (req.session.userId!=null) {
    res.render('HomeSessions', { title: 'HomeS',Logeado,role });
  } else {
      res.redirect('/LoginInicio')
  }
});
module.exports = router;
