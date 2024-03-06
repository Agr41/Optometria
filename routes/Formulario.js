const User = require("../models/Usuarios");
const mongoosePaginate = require('mongoose-paginate-v2');
const Test = require("../models/Tets");
const { MongoClient } = require('mongodb');
module.exports = async (req, res) => {

  var today = new Date();

  var date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate();
  req.body.FechaDelTest = date;

  try {
    if (req.body.opcion === '+1' && req.body.ODAsigmatismo1 !== 'on') {
      req.body.ODReni = req.body.ODReniPlus1
      req.body.OIReni = req.body.OIReniPlus1

    }
    if (req.body.opcion === '+2' && req.body.ODAsigmatismo1 !== 'on') {
      req.body.ODReni = req.body.ODReniPlus2
      req.body.OIReni = req.body.OIReniPlus2
    }

    if (req.body.opcion === '+1' && req.body.ODAsigmatismo1 === 'on') {
      req.body.ODReni = 'Astigmatismo' + ' ' + req.body.ODReniPlus1

    }
    if (req.body.opcion === '+1' && req.body.OIAsigmatismo1 === 'on') {
      req.body.OIReni = 'Astigmatismo' + ' ' + req.body.OIReniPlus1

    }
    if (req.body.opcion === '+2' && req.body.ODAsigmatismo2 === 'on') {
      req.body.ODReni = 'Astigmatismo' + ' ' + req.body.ODReniPlus2
    }
    if (req.body.opcion === '+2' && req.body.OIAsigmatismo2 === 'on') {
      req.body.OIReni = 'Astigmatismo' + ' ' + req.body.OIReniPlus2
    }
    console.log(req.body)


    //console.log(req.body);
    await Test.create(req.body);

    // Mostrar una alerta de éxito y redirigir a '/HomeSessions'
    switch (req.body.selectorPagina) {
      case "salir":
        res.send(`<script>alert("Se guardaron los datos del paciente"); window.location.href="/HomeSessions";</script>`);
        break;
      case "preeliminares":
        res.send(`<script>alert("Se guardaron los datos del paciente"); window.location.href="/preeliminares";</script>`);
        break;
      case "salud_ocular":
        res.send(`<script>alert("Se guardaron los datos del paciente"); window.location.href="/SaludOcular";</script>`);
        break;
      case "pruebas_f":
        res.send(`<script>alert("Se guardaron los datos del paciente"); window.location.href="/pruebas_f";</script>`);
        break;
      case "pruebas_c":
        res.send(`<script>alert("Se guardaron los datos del paciente"); window.location.href="/pruebas_complementarias";</script>`);
        break;
      case "rx_final":
        res.send(`<script>alert("Se guardaron los datos del paciente"); window.location.href="/rx_final";</script>`);
        break;
      case "clinica":
        res.send(`<script>alert("Se guardaron los datos del paciente"); window.location.href="/menu_clinica";</script>`);
        break;
      default:
        res.send(`<script>alert("Se guardaron los datos del paciente"); window.location.href="/HomeSessions";</script>`);
        break;
    }
  } catch (error) {
    console.error(error);
    // Mostrar una alerta de error y redirigir a '/HomeSessions'
    res.send('<script>alert("Hubo un error al guardar los datos del paciente"); window.location.href="/HomeSessions";</script>');


  }
};