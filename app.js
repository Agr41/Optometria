require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
const exphbs = require('express-handlebars');





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
const SaludOcular = require('./routes/SaludOcular')
const TestBorrar = require('./routes/TestBorrar')
const SoloAdmin = require('./middlewares/SoloAdmin')
const AdminYAlumno= require('./middlewares/AdminYAlumno')
const FiltrosPacientes= require('./routes/FiltroPacientes')
const rx_en_usoRouter= require('./routes/rx_en_uso')
const idiomaRouter= require('./routes/idioma')
const cambiarIdiomaRouter= require('./routes/cambiarIdioma')
const preeliminaresRouter= require('./routes/preeliminares')
const pruebas_complementarias =require('./routes/pruebas_complementarias')
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const i18nextFsBackend = require('i18next-fs-backend');
const rx_final= require('./routes/rx_final')
const pruebas_f= require('./routes/pruebas_f')
const TestGeneral = require('./routes/TestsGeneral')
const gestionar_roles = require('./routes/gestionar_roles')
const cambiar_contrasena = require('./routes/cambiar_contrasena.js')
const cambiar_contrasenaPOST = require('./routes/cambiar_contrasenaPOST')
const actualizar_correo = require('./routes/actualizar_correo')
const actualizar_correoPOST = require('./routes/actualizar_correoPOST')

// Importa moment.js y el idioma español
const moment = require('moment');
require('moment/locale/es');



var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

// HBS helpers
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper('sumar', (value1, value2) => value1 + value2);
hbs.registerHelper('restar', (value1, value2) => {
  const resultado = value1 - value2;
  return resultado > 0 ? resultado : 1;
});

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
hbs.registerHelper('isEqual', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
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
hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('limit', function (arr, limit) {
  if (!Array.isArray(arr)) { return []; }  // Retorna un arreglo vacío si no es un arreglo
  return arr.slice(0, limit);
});


app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.__express); // Usar hbs como alias para el motor de plantillas

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

i18next
    .use(i18nextFsBackend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        fallbackLng: 'en',
        backend: {
            loadPath: __dirname + '/public/locales/{{lng}}/{{ns}}.json'
        },
        detection: {
            order: ['session', 'querystring', 'cookie', 'header'],
            caches: ['session']
        },
        preload: ['en', 'es'], // Idiomas pre-cargados
    });

    app.use(i18nextMiddleware.handle(i18next));
    hbs.registerHelper('t', function (key, options) {
      const opts = options.hash || {};
      return i18next.t(key, { lng: this.lng, ...opts });
  });
  
 
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
app.get('/PanelUsuarios',SoloAdmin,PanelUsuarios)
app.get('/PanelPacientes',AdminYAlumno,PanelPacientesRouter)
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
app.use('/SaludOcular',SaludOcular)
app.use('/TestBorrar', TestBorrar)
app.use('/graficas', graficasRouter)
app.use('/rx_en_uso', rx_en_usoRouter)
app.use('/idioma', idiomaRouter)
app.use('/cambiarIdioma', cambiarIdiomaRouter)
app.use('/preeliminares', preeliminaresRouter)
app.use('/pruebas_complementarias', pruebas_complementarias)

app.use('/rx_final', rx_final)
app.use('/pruebas_f', pruebas_f)
app.get('/TestGeneral/:id',TestGeneral)
app.get('/gestionar_roles',gestionar_roles)
app.get('/cambiar_contrasena',cambiar_contrasena)
app.post('/cambiar_contrasenaPOST',cambiar_contrasenaPOST)
app.get('/actualizar_correo',actualizar_correo)
app.post('/actualizar_correoPOST',actualizar_correoPOST)

/*
app.get('/popup/:id',async (req, res) => {
      const Paciente = require('./models/pacientes')
      const Tests= require('./models/Tets')

      const id = req.params.id;
      const pacientes = await Paciente.find({_id:id})
      const tests= await Tests.find({id:id})


      var Numero = [];
      for (i = 0; i < tests.length; i++) {
        Numero.push(i + 1);
      }
      //console.log(Numero)
      const title = `${id}`;
      const content = `This is popup ${id}`;
      res.render('popup', { title, content,pacientes,tests,Numero});
  
  
  
    });
  */
    app.get('/popup/:id', async (req, res) => {
      const Paciente = require('./models/pacientes');
      const Tests = require('./models/Tets'); // Verifica que el nombre del archivo sea correcto.
    
      const id = req.params.id;
      const pacientes = await Paciente.find({_id: id});
      let tests = await Tests.find({id: id});
    
      tests = tests.map(test => {
        // Inicializa TipoTest como 'Desconocido' para manejar casos donde CamposDeFormulario no existe o no coincide con ninguna condición.
        test.TipoTest = 'Desconocido';
    
        if (test.SinLentesDistancia) {
          test.TipoTest = 'Tamizaje';
        } else if (test.CamposDeFormulario) {
          if ('pa1' in test.CamposDeFormulario) {
            test.TipoTest = 'RX';
          } else if ('Ishihara' in test.CamposDeFormulario) {
            test.TipoTest = 'PruebasComplementarias';
          } else if ('FLL' in test.CamposDeFormulario) {
            test.TipoTest = 'PruebasFuncionales';
          } else if ('ColorDeRetina' in test.CamposDeFormulario) {
            test.TipoTest = 'SaludOcular';
          } else if ('versionS' in test.CamposDeFormulario) {
            test.TipoTest = 'Preeliminares';
          }
        }
    
        return test;
      });
    
      var Numero = tests.map((_, index) => index + 1);
    
      const title = `${id}`;
      const content = `This is popup ${id}`;
      res.render('popup', { title, content, pacientes, tests, Numero });
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
