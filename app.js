require('dotenv').config()
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
var PanelPacientesRouter = require('./routes/PanelPacientes');
var graficasRouter = require('./routes/graficas');
const bodyParser = require("body-parser");
const Formulario = require ('./routes/Formulario')
const LoginUsuario = require('./routes/LoginUsuario')
const logout = require('./routes/logout');
const FiltrosUsuarios = require('./routes/FiltroUsuarios')
const Borrar = require ('./routes/Borrar')
const Registrarse = require ('./routes/Registrarse')
const RegistrarsePost = require ('./routes/RegistrarsePost')
const FiltrosUsuarios2 = require('./routes/FiltrosUsuarios2')
const TestCliente = require('./routes/TestCliente')
const TestActualizar = require('./routes/TestActualizar')
const TestBorrar = require('./routes/TestBorrar')
const SoloAdmin = require('./middlewares/SoloAdmin')
// Importa moment.js y el idioma español
const moment = require('moment');
require('moment/locale/es');



var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

// HBS helpers
hbs.registerPartials(__dirname + "/views/partials");

hbs.registerHelper('admin', function(value) {
  return value !== 'admin';
});
hbs.registerHelper('alumno', function(value) {
  return value !== 'alumno';
});


hbs.registerHelper('Falso', function(value2) {
  return value2 !== false;
});


hbs.registerHelper('Verdad', function(value3) {
  return value3 !== true;
});
hbs.registerHelper('eq', function(a, b) {
  return a === b;
});
hbs.registerHelper('or', function() {
  for (var i=0; i<arguments.length-1; i++) {
    if (arguments[i]) {
      return true;
    }
  }
  return arguments[arguments.length-1];
});

hbs.registerHelper('not', function(value) {
  return !value;
});
hbs.registerHelper('dateFormat', function(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
});
// Define la función dateFormat en tu contexto de Handlebars
hbs.registerHelper('dateFormat', function (date) {
  return moment(date).format('DD [de] MMMM [de] YYYY'); // Puedes personalizar el formato como desees
});

hbs.registerHelper('isChecked', function(value) {
  return value ? 'checked' : '';
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
global.Id= 'Id';

app.use(require('express-session')({ secret: 'AaronGuapo', resave: true, saveUninitialized: true }));

app.use((req, res, next) => {
  Logeado = req.session.userId;
  role= req.session.role;
  usuario= req.session.username;
  next()
  });



mongoose.set("strictQuery", true);
mongoose.connect(
  process.env.Base,
    { useNewUrlParser: true }
);

//mongodb+srv://NoLeDeboANadie:rickygei@noledeboanadie.i6p3wc9.mongodb.net/test


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
app.get('/PanelPacientes',PanelPacientesRouter)
app.use('/FiltrosUsuarios',FiltrosUsuarios)
app.use('/Borrar',Borrar)
app.get('/Registrarse',SoloAdmin,Registrarse)
app.get('/TestCliente/:id',TestCliente)
app.post('/RegistrarsePost',RegistrarsePost)
app.use('/FiltrosUsuarios2',FiltrosUsuarios2)
app.post('/TestActualizar',TestActualizar)
app.use('/TestBorrar', TestBorrar)
app.use('/graficas', graficasRouter)

app.get('/popup/:id',async (req, res) => {
      const User = require('./models/Usuarios')
      const Tests= require('./models/Tets')

      const id = req.params.id;
      const usuarios = await User.find({username:id})
      const tests= await Tests.find({username:id})
      //console.log(tests)
      var Numero = [];
      for (i = 0; i < tests.length; i++) {
        Numero.push(i + 1);
      }
      //console.log(Numero)
      const title = `${id}`;
      const content = `This is popup ${id}`;
      res.render('popup', { title, content,usuarios,tests,Numero});
  
  
  
    });
  
   
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
