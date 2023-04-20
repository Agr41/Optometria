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
const PanelUsuarios = require('./routes/PanelUsuarios');
const bodyParser = require("body-parser");
const Formulario = require ('./routes/Formulario')
const LoginUsuario = require('./routes/LoginUsuario')
const expressSession = require('express-session');
const logout = require('./routes/logout');
const FiltrosUsuarios = require('./routes/FiltroUsuarios')
const Borrar = require ('./routes/Borrar')

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());


hbs.registerPartials(__dirname + "/views/partials");

hbs.registerHelper('admin', function(value) {
  return value !== 'admin';
});

hbs.registerHelper('times', function(n, block) {
  let accum = '';
  for (let i = 0; i < n; ++i) {
    accum += block.fn(i);
  }
  return accum;
});

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

global.Logeado = null;
global.role = null;

app.use(expressSession({
  secret: 'AaronGuapo'
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



app.post('/Formulario', Formulario);
app.use('/', indexRouter);
app.use('/LoginInicio', LoginInicioRouter);
app.post('/LoginUsuario',LoginUsuario)
app.use('/users', usersRouter);
app.use('/form', formRouter);
app.use('/HomeSessions', HomeRouter);
app.use('/test', formtestRouter);
app.use('/ListaClientes', ListaRouter);
app.get('/logout',logout)
app.use('/configuracion', configuracionRouter);
app.get('/PanelUsuarios',PanelUsuarios)
app.use('/FiltrosUsuarios',FiltrosUsuarios)
app.use('/Borrar',Borrar)





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
