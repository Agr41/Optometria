var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  var ingles = false
  if (Idioma == "en-US") {
    ingles = true;
  }
  if (req.session.userId != null) {
    res.render('form', { title: 'Form', Logeado, role, ingles });
  } else {
    res.redirect('/LoginInicio');
  }
});

const paciente = require('../models/pacientes');

router.post('/registrarpaciente', async function (req, res, next) {
  console.log("entró a post");
  if (req.session.userId != null) {
    try {
      let contador = await paciente.countDocuments();

      function generarId() {
        contador++; // Aumentar el contador en 1 en cada llamada
        if (contador > 999999) {
          // Reiniciar el contador si llega a 999999
          contador = 1;
        }

        const id = contador.toString().padStart(6, '0'); // Convertir el contador en una cadena de 6 dígitos

        return id;
      }


      // Ejemplo de uso:
      const nuevoId = generarId();
      req.body.Folio = nuevoId
      req.body.NombreCompleto = req.body.Nombre + ' ' + req.body.ApellidoPaterno
      await paciente.create(req.body);

      // Mostrar una alerta de éxito y redirigir a
      switch(req.body.selectorPagina){
        case "salir":
          res.send(`<script>alert("Se ha registrado al paciente. Número de fólio: ${nuevoId}"); window.location.href="/HomeSessions";</script>`);
          break;
          case "tamizaje":
            res.send(`<script>alert("Se ha registrado al paciente. Número de fólio: ${nuevoId}"); window.location.href="/test";</script>`);
            break;
            case "clinica":
              res.send(`<script>alert("Se ha registrado al paciente. Número de fólio: ${nuevoId}"); window.location.href="/menu_clinica";</script>`);
              break;
              default:
                res.send(`<script>alert("Se ha registrado al paciente. Número de fólio: ${nuevoId}"); window.location.href="/HomeSessions";</script>`);
                break;
      }
      
      console.log("Hiciste el registro correctamente");
    } catch (error) {
      // Mostrar una alerta de error y redirigir a
      res.send('<script>alert("Hubo un error al registrar al paciente"); window.location.href="/form";</script>');
    }
  } else {
    // Mostrar una alerta de error y redirigir a
    res.send('<script>alert("Hubo un error al registrar al paciente"); window.location.href="/form";</script>');
  }
});

module.exports = router;