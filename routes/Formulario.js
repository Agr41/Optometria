const User = require("../models/Usuarios");
const mongoosePaginate = require('mongoose-paginate-v2');
const Test = require("../models/Tets");

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
    if (req.body.opcion=== '+1')
    {
      req.body.ODReni =  req.body.ODReniPlus1
      req.body.OIReni =  req.body.OIReniPlus1

    }
    if (req.body.opcion=== '+2'){
      req.body.ODReni =  req.body.ODReniPlus2
      req.body.OIReni =  req.body.OIReniPlus2
    }
    console.log(req.body);
    await Test.create(req.body);
    // Mostrar una alerta de éxito y redirigir a '/HomeSessions'
    res.send('<script>alert("Se guardaron los datos del paciente correctamente"); window.location.href="/HomeSessions";</script>');
  } catch (error) {
    console.error(error);
    // Mostrar una alerta de error y redirigir a '/HomeSessions'
    res.send('<script>alert("Hubo un error al guardar los datos del paciente"); window.location.href="/HomeSessions";</script>');
  }
};