var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',(req, res, next) => {
  
  if (req.session.userId!=null) {
    res.render('form', { title: 'Form' ,Logeado,role});
  } else {
      res.redirect('/LoginInicio')
  }
});

const paciente = require('../models/pacientes')
router.post('/registrarpaciente',async function (req,res, next){
    console.log("entró a post")
if (req.session.userId!=null){
  try{
    await paciente.create(req.body)
  res.send(`<script>alert("Se ha registrado al paciente")
        window.location.href='/HomeSessions';
        </script>`);
        console.log("Registro correcto");}
        catch{
          res.send(`<script>alert("Hubo un error")
        window.location.href='/HomeSessions';
        </script>`);
        }
}
else{
  res.send(`<script>alert("Hubo un error")
        window.location.href='/';
        </script>`);
}
      
      res.redirect('/HomeSessions')

}
)
module.exports = router;