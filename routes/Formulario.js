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
    await Test.create(req.body);
    // Mostrar una alerta de éxito y redirigir a '/HomeSessions'
    res.send('<script>alert("Se guardaron los datos del paciente correctamente"); window.location.href="/HomeSessions";</script>');
  } catch (error) {
    console.error(error);
    // Mostrar una alerta de error y redirigir a '/HomeSessions'
    res.send('<script>alert("Hubo un error al guardar los datos del paciente"); window.location.href="/HomeSessions";</script>');
  }
};