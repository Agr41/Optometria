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
var menu_clinicaRouter = require('./routes/menu_clinica.js');
const PanelUsuarios = require('./routes/PanelUsuarios');
var PanelPacientesRouter = require('./routes/PanelPacientes');
var graficasRouter = require('./routes/graficas');
const bodyParser = require("body-parser");
const Formulario = require ('./routes/Formulario')
const LoginUsuario = require('./routes/LoginUsuario')
const logout = require('./routes/logout');
const FiltrosUsuarios = require('./routes/FiltroUsuarios')
const Borrar = require ('./routes/Borrar')
const BorrarPacientes = require ('./routes/BorrarPacientes')
const Registrarse = require ('./routes/Registrarse')
const RegistrarsePost = require ('./routes/RegistrarsePost')
const FiltrosUsuarios2 = require('./routes/FiltrosUsuarios2')
const TestCliente = require('./routes/TestCliente')
const TestPaciente= require ('./routes/TestPaciente')
const TestActualizar = require('./routes/TestActualizar')
const TestPacientePOST = require('./routes/TestPacientePOST')
const TestBorrar = require('./routes/TestBorrar')
const SoloAdmin = require('./middlewares/SoloAdmin')
const FiltrosPacientes= require('./routes/FiltroPacientes')
const rx_en_usoRouter= require('./routes/rx_en_uso')
const idiomaRouter= require('./routes/idioma')
const cambiarIdiomaRouter= require('./routes/cambiarIdioma')
const preeliminaresRouter= require('./routes/preeliminares')
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
  return new Date(date).toLocaleDateString('es-MX', options);
});
// Define la función dateFormat en tu contexto de Handlebars
hbs.registerHelper('dateFormat', function (date) {
  return moment.utc(date).format('DD [de] MMMM [de] YYYY'); // Puedes personalizar el formato como desees
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
global.Idioma = null
global.usuario = null
global.nombre = null

app.use(require('express-session')({ secret: 'AaronGuapo', resave: true, saveUninitialized: true }));

app.use((req, res, next) => {
  Logeado = req.session.userId;
  Idioma = req.session.language;
  role= req.session.role;
  usuario=req.session.username;
  nombre=req.session.nombre
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
app.use('/menu_clinica', menu_clinicaRouter);
app.get('/PanelUsuarios',PanelUsuarios)
app.get('/PanelPacientes',PanelPacientesRouter)
app.use('/FiltrosUsuarios',FiltrosUsuarios)
app.use('/Borrar',Borrar)
app.use('/BorrarPacientes',BorrarPacientes)
app.get('/Registrarse',SoloAdmin,Registrarse)
app.get('/TestCliente/:id',TestCliente)
app.get('/TestPaciente/:id',TestPaciente)
app.post('/RegistrarsePost',RegistrarsePost)
app.use('/FiltrosUsuarios2',FiltrosUsuarios2)
app.use('/FiltrosPacientes',FiltrosPacientes)
app.post('/TestActualizar',TestActualizar)
app.post('/TestPacientePOST',TestPacientePOST)
app.use('/TestBorrar', TestBorrar)
app.use('/graficas', graficasRouter)
app.use('/rx_en_uso', rx_en_usoRouter)
app.use('/idioma', idiomaRouter)
app.use('/cambiarIdioma', cambiarIdiomaRouter)
app.use('/preeliminares', preeliminaresRouter)

app.get('/popup/:id',async (req, res) => {
      const Paciente = require('./models/pacientes')
      const Tests= require('./models/Tets')

      const id = req.params.id;
      const pacientes = await Paciente.find({_id:id})
      const tests= await Tests.find({id:id})
      //console.log(tests)
      var Numero = [];
      for (i = 0; i < tests.length; i++) {
        Numero.push(i + 1);
      }
      //console.log(Numero)
      const title = `${id}`;
      const content = `This is popup ${id}`;
      res.render('popup', { title, content,pacientes,tests,Numero});
  
  
  
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
