var express = require('express');
var router = express.Router();
const Joi = require('joi');

/* GET home page. */
router.get('/', (req, res, next) => {
  var idioma= req.session.language

  if (req.session.userId != null) {
    res.render('form', { title: 'Form', Logeado, role, idioma });
  } else {
    res.redirect('/LoginInicio');
  }
});

const paciente = require('../models/pacientes');

router.post('/registrarpaciente', async function (req, res, next) {
  console.log(req.body);
  const pacienteValidationSchema = Joi.object({
    Nombre: Joi.string().required().pattern(new RegExp(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜäÄöÖ\-.\s]+$/)).messages({
      "string.empty": "El nombre no puede estar vacío.",
      "string.pattern.base": "El nombre sólo puede contener letras, espacios, guiones y puntos."
    }),
    
    ApellidoPaterno: Joi.string().required().pattern(new RegExp(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜäÄöÖ\s]+$/)).messages({
      "string.empty": "El apellido no puede estar vacío.",
      "string.pattern.base": "El apellido sólo puede contener letras y espacios."
    }),
    ciudad: Joi.string().required().pattern(new RegExp(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑü,.\-\s]+$/)).messages({
      "string.empty": "La ciudad no puede estar vacía.",
      "string.pattern.base": "La ciudad sólo puede contener letras, números, espacios, comas, puntos, guiones y diéresis."
    }),
    
    
    ocupacion: Joi.string().required().pattern(new RegExp(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)).messages({
      "string.empty": "La ocupación no puede estar vacía.",
      "string.pattern.base": "La ocupación sólo puede contener letras y espacios."
    }),
    sexo: Joi.string().required().valid('M', 'F', 'Otro').messages({
      "string.empty": "El campo sexo no puede estar vacío.",
      "any.only": "Sexo debe ser 'Masculino', 'Femenino' o 'Otro'."
    }),
    Edad: Joi.string().required().pattern(/^\d+$/).messages({
      "string.empty": "La edad no puede estar vacía.",
      "string.pattern.base": "La edad sólo puede contener números."
    }),
    selectorPagina: Joi.string().required().valid('salir', 'tamizaje', 'clinica').messages({
      "string.empty": "El selector de página no puede estar vacío.",
      "any.only": "Selector de página inválido."
    })
});
  if (req.session.userId != null) {
    try {

      
      const { error, value } = pacienteValidationSchema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.send(`<script>alert("Error de validación: ${error.details.map(x => x.message).join(', ')}"); window.location.href="/form";</script>`);
      }
      let contador = await paciente.countDocuments();  // Obtiene el número de documentos y lo almacena en contador

      function generarId() {
        contador++;  // Incrementa contador en 1
        if (contador > 999999) {
          contador = 1;  // Restablece contador si supera 999999
        }
        return contador.toString().padStart(6, '0');  // Convierte contador a string y rellena con ceros hasta tener 6 dígitos
      }

      
      

      const nuevoId = generarId();
      console.log(nuevoId);
      req.body.Folio = nuevoId;
      req.body.NombreCompleto = req.body.Nombre + ' ' + req.body.ApellidoPaterno;
      await paciente.create(req.body);

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
    } catch (error) {
      console.error("Error al registrar paciente: ", error);
      res.send('<script>alert("Hubo un error al registrar al paciente"); window.location.href="/form";</script>');
    }
  } else {
    res.send('<script>alert("Acceso no autorizado"); window.location.href="/LoginInicio";</script>');
  }
});

module.exports = router;



/*
var express = require('express');
var router = express.Router();

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
  if (req.session.userId != null) {
    try {
      let contador = await paciente.countDocuments();

      function generarId() {
        contador++;
        if (contador > 999999) {
          contador = 1;
        }
        // Convertir el contador a una cadena de 6 dígitos.
        const idStr = contador.toString().padStart(6, '0');
        
        // Reordenar los dígitos moviendo los ceros del principio al final.
        const idReordenado = idStr.replace(/^0+/, '') + idStr.match(/^0+/)[0];
      
        // Convertir la cadena reordenada a número.
        const idNum = Number(idReordenado);
        
        return idNum;
      }

      // Ejemplo de uso:
      const nuevoId = generarId();
      console.log(nuevoId); // Muestra el número reordenado, por ejemplo, de '000312' a '312000'
      req.body.Folio = nuevoId;
      console.log(req.body.Folio)
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
*/
