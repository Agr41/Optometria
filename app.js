var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
// const bootstrap = require('bootstrap');
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
var LoginInicioRouter = require('./routes/LoginInicio');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var formRouter = require('./routes/form');
var HomeRouter = require('./routes/HomeSessions');
var formtestRouter = require('./routes/test');
var ListaRouter = require('./routes/ListaClientes.js');
var configuracionRouter = require('./routes/configuracion.js');

const bodyParser = require("body-parser");
const Registrar = require('./routes/Registrar')
const RegistrarPost = require('./routes/RegistrarPost')
const Formulario = require ('./routes/Formulario')
const LoginUsuario = require('./routes/LoginUsuario')
const expressSession = require('express-session');
const logout = require('./routes/logout');


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());


hbs.registerPartials(__dirname + "/views/partials");

hbs.registerHelper('admin', function(value) {
  return value !== 'admin';
});

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

<<<<<<< HEAD
global.Logeado = null;
global.role = null;

app.use(expressSession({
  secret: 'keyboard cat'
  }))
  
app.use((req, res, next) => {
  Logeado = req.session.userId;
  role= req.session.role;
  usuario= req.session.username;
  next()
  });



mongoose.set("strictQuery", true);
mongoose.connect(
    "mongodb://localhost:27017/Optometria",
    { useNewUrlParser: true }
);
=======
// mongoose.set("strictQuery", true);
// mongoose.connect(
//     "mongodb+srv://Aaron:tamales@aaronproyecto.sfdk1.mongodb.net/Optometria",
//     { useNewUrlParser: true }
// );
>>>>>>> 6d60d4f227ffcbf50f1e8ee4c39cda5bf58b837b


app.use('/Registrar', Registrar);
app.post('/RegistrarPost', RegistrarPost);
app.post('/Formulario', Formulario);
app.use('/', indexRouter);
app.use('/LoginInicio', LoginInicioRouter);
app.post('/LoginUsuario',LoginUsuario)
app.use('/users', usersRouter);
app.use('/form', formRouter);
app.use('/HomeSessions', HomeRouter);
app.use('/test', formtestRouter);
app.use('/ListaClientes', ListaRouter);
<<<<<<< HEAD
app.get('/logout',logout)
=======
app.use('/configuracion', configuracionRouter);

>>>>>>> 6d60d4f227ffcbf50f1e8ee4c39cda5bf58b837b

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
